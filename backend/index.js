const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog");
const followRoutes = require("./routes/follow");
const db = require("./config/db");
const cors = require("cors"); // for enabling calls any network
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8100;

app.use(express.json());
//Store for MongoDb session
const store = new MongoDBStore({
  uri: process.env.MONGOURL,
  collection: "session",
});
//using the session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

const corsOptions = {
  origin: ["https://bloggy-git-main-abhishek2813.vercel.app","https://bloggy-abhishek2813.vercel.app",process.env.CORE_URL], // 
  credentials: true,
};
app.use(cors(corsOptions));

//Adding All Routes from routes folder
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/follow", followRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
