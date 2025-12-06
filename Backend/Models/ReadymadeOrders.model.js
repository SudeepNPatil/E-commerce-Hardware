import mongoose from 'mongoose';

const readymadeorders = mongoose.Schema(
  {
    userId: String,
    status: String,
    orderedOn: String,
    estimatedDelivary: String,
    OrderId: String,
    quantity: mongoose.Schema.Types.Mixed,
    totalAmount: mongoose.Schema.Types.Mixed,
    technician: mongoose.Schema.Types.Mixed,
    product: mongoose.Schema.Types.Mixed,
    payment: mongoose.Schema.Types.Mixed,
    address: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true, strict: false }
);

const ReadymadeOrder = mongoose.model('ReadymadeOrder', readymadeorders);

export default ReadymadeOrder;
