const nano = require("nano")(
  `http://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`
);

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
      console.log("Getting posts...");
      const files = await db.find({
        selector: {},
        fields: ["text", "datetime"],
        limit: 50
      });
      console.log(files.docs);
      return files.docs;
    }
  },
  Mutation: {
    post: async (_, { text }) => {
      console.log("posting", text);
      const newPost = {
        text: text,
        datetime: dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZZ")
      };
      const response = await db.insert(newPost);
      console.log(response);
      return { success: true, message: "Post added!", post: newPost };
    }
  }
};

module.exports = resolvers;
