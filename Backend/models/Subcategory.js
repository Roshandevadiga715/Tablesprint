import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sequence: { type: Number, required: true },
  image: { type: String, required: false },
  status: { type: String, default: 'Active' },
  selectedCategory:{type: String, required: true}

});

const SubCategory = mongoose.model('SubCategorySchema', SubCategorySchema);
export default SubCategory;