import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sequence: { type: Number, required: true },
  image: { type: String, required: false },
  status: { type: String, default: 'Active' },
  selectedCategory:{type: String, required: true},
  selectedSubCategory:{type: String, required: true}
});

const Products = mongoose.model('ProductSchema', ProductSchema);
export default Products;