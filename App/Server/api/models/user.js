const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// transform for sending as json
function omitPrivate(doc, obj) {
  delete obj.__v;
  return obj;
}

// schema options
var options = {
  toJSON: {
    transform: omitPrivate,
  },
};

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a email!"],
      validate: {
        validator: function () {
          return this.email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          );
        },
        message: "Please provide a valid email!",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      validate: {
        validator: function () {
          return this.email.length > 5;
        },
        message: "Please provide a valid password!",
      },
    },
  },
  options
);

const QuestionSchema = new Schema(
  {
    desc: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  options
);

const OptionSchema = new Schema(
  {
    desc: String,
    question: { type: Schema.Types.ObjectId, ref: "Question" },
  },
  options
);

const User = mongoose.model("User", UserSchema);
const Question = mongoose.model("Question", QuestionSchema);
const Option = mongoose.model("Option", OptionSchema);

module.exports = { User, Question, Option };
