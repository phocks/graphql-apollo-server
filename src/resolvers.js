const nano = require("nano")(
  `http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

// Test data
let posts = [
  {
    text: "Hello there!",
    author: "Someone"
  },
  {
    text: "How's it going?",
    author: "Anon"
  }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    posts: async () => {
      console.log("Getting posts...");

      return posts;
    }
  },
  Mutation: {
    post: (_, { text }) => {
      console.log("posting", text);
      const newPost = { text: text };
      posts.push(newPost);
      return { success: true, message: "Post added!", post: newPost };
    }
  }
};

module.exports = resolvers;
