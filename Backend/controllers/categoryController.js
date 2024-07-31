import Category from '../models/Category.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).send('Category not found');
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send('Category not found');
    res.status(200).send('Category deleted');
  } catch (err) {
    res.status(400).send(err);
  }
};
