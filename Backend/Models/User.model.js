import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      default: 'user',
    },
    lastname: {
      type: String,
    },
    Email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true, strict: false }
);

const User = mongoose.model('User', userSchema);

export default User;
