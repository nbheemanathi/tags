import gql from 'graphql-tag';
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index.js";
import { user } from "./types/userType.js";
import { admin } from "./types/adminType.js";
import { DateTimeTypeDefinition } from 'graphql-scalars';

const typeDefs = gql`
  type Query {
    getAdmin(username: String!): Admin
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): Admin!
    login(username: String!, password: String!): Admin!
    addUser(userInput: UserInput): User!
    updateUser(userInput: UserInput): User!
  }
`;

export default makeExecutableSchema({
  typeDefs: [DateTimeTypeDefinition, typeDefs, user, admin],
  resolvers,
});
