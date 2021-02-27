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
    post(text: String!): SignUpdateResponse!
  }

  type SignUpdateResponse {
    success: Boolean!
    message: String
    post: Post
  }
`;

module.exports = typeDefs;
