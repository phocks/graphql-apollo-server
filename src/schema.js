const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here

  type Post {
    id: ID!
    text: String
    date: String
  }

  type Query {
    posts: [Post]!
  }

  type Mutation {
    signBook(signIds: [ID]!): SignUpdateResponse!
  }

  type SignUpdateResponse {
    success: Boolean!
    message: String
    posts: [Post]
  }
`;

module.exports = typeDefs;
