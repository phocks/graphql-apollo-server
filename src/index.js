require("dotenv").config(); // For environment values
const express = require("express");
var cors = require('cors')
const { ApolloServer } = require("apollo-server-express");

// const { ApolloServer } = require("apollo-server");

const app = express();
app.use(cors())


const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

// The `listen` method launches a web server.
// server.listen(process.env.SERVER_PORT).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

app.listen({ port: process.env.SERVER_PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`
  )
);
