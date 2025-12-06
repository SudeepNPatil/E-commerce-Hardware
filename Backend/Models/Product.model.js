import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
  {},

  { timestamps: true, strict: false }
);

const Products = mongoose.model('Products', ProductSchema);

export default Products;
