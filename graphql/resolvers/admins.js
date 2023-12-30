import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { UserInputError } from "apollo-server";
import { GraphQLError } from 'graphql';
import { validateRegisterInput, validateLoginInput } from "../../util/validators.js";
// import { MailService } from "@sendgrid/mail";
import emailService from "../../util/emailService.js";
import Admin from "../../models/Admin.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export default {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new GraphQLError("Errors", { errors });
      }
      const admin = await Admin.findOne({ username });
      if (!admin) {
        throw new GraphQLError("Admin not found", {
          errors: {
            general: "Admin not found",
          },
        });
      }
      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        throw new GraphQLError("Wrong Credentials", {
          errors: {
            general: "Wrong credentials",
          },
        });
      }
      const token = generateToken(admin);    
      return {
        ...admin._doc,
        id: admin._id,
        token,
      };
    },

    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new GraphQLError("Errors", {
          errors,
        });
      }
      password = await bcrypt.hash(password, 12);

      const admin = await Admin.findOne({ username: username });
      if (admin) {
        throw new GraphQLError("Username already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const newAdmin = new Admin({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newAdmin.save();

      const token = generateToken(res);
      // emailService("nbheemanathi@gmail.com")
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
  Query: {
    async getAdmin(_, { username }) {
      try {
        const admin = await Admin.findOne({ username }).lean();
        // const userSavedRecipes = await UserRecipes.findOne({user})
        admin.id = String(admin._id);
        // if(userSavedRecipes){
        //   Object.assign(user, {savedRecipes: userSavedRecipes.recipes});
        // }
        if (admin) {
          return admin;
        } else {
          throw new Error("admin not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
