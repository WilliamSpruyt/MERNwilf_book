const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  homeTown: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  actvityDate: {
    type: Date,
    default: Date.now()
  },

  messages: {
    type: Array,
    default: []
  },
  posts: {
    type: Array,
    default: []
  },
  friends: {
    type: Array,
    default: []
  }

});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);