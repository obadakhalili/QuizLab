const { Schema, model } = require("mongoose");
const { hash, verify } = require("argon2");
const { sign } = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator(v) {
        return /^\w+ \w+$/.test(v);
      },
      message: "Not a valid name"
    },
    maxlength: [18, "Name should not be more than 18 characters long"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator(v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          v
        );
      },
      message: "Not a valid email"
    },
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [7, "Password must have a minimum length of 7"]
  },
  avatar: Buffer
});

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password);
  }
  next();
});

class UserMethods {
  async generateAuthToken() {
    return await sign({ _id: this._id }, process.env.JWT_SECRET);
  }
  toJSON() {
    const userObject = this.toObject();
    const [firstname, lastname] = userObject.name.split(" ");
    userObject.firstname = firstname;
    userObject.lastname = lastname;
    const unwantedFields = ["_id", "name", "avatar", "password", "__v"];
    for (let field of unwantedFields) {
      userObject[field] = undefined;
    }
    return userObject;
  }
  static async findByCredentials({ email, password }) {
    const user = await User.findOne({ email });
    if (!user || !(await verify(user.password, password))) {
      throw "Bad Credentials";
    }
    return user;
  }
}

userSchema.loadClass(UserMethods);

const User = model("User", userSchema);

module.exports = User;
