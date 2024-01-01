import gql from 'graphql-tag';

export const user = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: Float
  }
  input UserInput {
    userId:ID
    firstName: String!
    lastName: String!
    email: String!
    phone: Float
  }
`;
