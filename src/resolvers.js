const couchDBPath = `http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
const nano = require("nano")(couchDBPath);
const db = nano.use("jb_guestbook");
const dayjs = require("dayjs");
// Standard date string format dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")

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
      const files = await db.find({
        selector: {},
        fields: ["text", "datetime"],
        limit: 50
      });
      return files.docs;
    }
  },
  Mutation: {
    post: async (_, { text }) => {
      const newPost = {
        text: text,
        datetime: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
      };
      const response = await db.insert(newPost);
      return { success: true, message: "Post added!", post: newPost };
    }
  }
};

module.exports = resolvers;
