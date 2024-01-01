import User from "../../models/User.js";
import checkAuth from "../../util/check-auth.js";


export default {
  Query: {    
    async getUsers(_,{},context) {
      const admin = checkAuth(context);      
      try {
        const users = await User.find({}).sort({ createdAt: -1 });
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async addUser(_, { userInput: { firstName, lastName, email, phone } }, context) {
        const admin = checkAuth(context);
        const newUser = new User({
          firstName,
          lastName,
          email,
          phone
          });
          const user = await newUser.save();

        return user
    },
    async updateUser(
      _,
      {
        userInput: {
          userId,
          email,
          firstName,
          lastName,
          phone
        },
      },
      context
    ) {
      const userObj = { email, firstName, lastName, phone };     

      const result = await User.findOneAndUpdate({ _id: userId }, userObj, {
        new: true,
      });
      return result;
    },
    async deleteUser(_, { userId }, context) {
      const deleteResponse = await User.findOneAndRemove(
        {
          _id: userId,
        },
      );
      return deleteResponse;
    },
  },
};
