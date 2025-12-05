import mongoose from 'mongoose';

const customorderschema = mongoose.Schema(
  {
    userId: String,
    status: String,
    orderedOn: String,
    estimatedDelivary: String,
    orderId: mongoose.Schema.Types.Mixed,
    cartItems: mongoose.Schema.Types.Mixed,
    technician: mongoose.Schema.Types.Mixed,
    totalAmount: mongoose.Schema.Types.Mixed,
    payment: mongoose.Schema.Types.Mixed,
    address: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true, strict: false }
);

const CustomOrder = mongoose.model('CustomOrder', customorderschema);

export default CustomOrder;
