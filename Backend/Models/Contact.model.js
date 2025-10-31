import mongoose from 'mongoose';

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
    email: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { strict: false }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
