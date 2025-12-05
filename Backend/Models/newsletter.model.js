import mongoose from 'mongoose';

const newsletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
  },
  { timestamps: true, strict: false }
);

const newsletter = mongoose.model('newsletter', newsletterSchema);

export default newsletter;
