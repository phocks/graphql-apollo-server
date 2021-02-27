require("dotenv").config(); // For environment values

const { ApolloServer } = require("apollo-server");
// const guestbookAPI = require("./datasources/guestbook");



const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// The `listen` method launches a web server.
server.listen("65001").then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
