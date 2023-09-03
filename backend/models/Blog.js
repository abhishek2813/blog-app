const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  textBody: {
    type: String,
    require: true,
  },
  creationDateTime: {
    type: Date,
    default: Date.now(),
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});
module.exports = mongoose.model("blogs", blogSchema);
