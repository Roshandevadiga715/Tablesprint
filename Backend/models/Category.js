import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sequence: { type: Number, required: true },
  image: { type: String, required: false },
  status: { type: String, default: 'Active' },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
