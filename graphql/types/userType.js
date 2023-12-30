import gql from 'graphql-tag';

export const user = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
  }
`;
