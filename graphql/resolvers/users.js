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
    async addUser(_, { userInput: { firstName, lastName, email } }, context) {
        const admin = checkAuth(context);
        const newUser = new User({
          firstName,
          lastName,
          email,
          });
          const user = await newUser.save();

        return user
    }
  },
};
