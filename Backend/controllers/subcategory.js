
import SubCategory from '../models/Subcategory.js';

export const createSubCategory = async (req, res) => {
    console.log('res',res.body)
    try {
      const category = new SubCategory(req.body);
      await category.save();
      res.status(201).send(category);
      console.log("res",category)
    } catch (err) {
      res.status(400).send(err);
    }
  };

  // Get all categories
export const getSubCategories = async (req, res) => {
    try {
      const categories = await SubCategory.find();
      res.status(200).send(categories);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  export const deleteSubCategory = async (req, res) => {
    try {
      const category = await SubCategory.findByIdAndDelete(req.params.id);
      if (!category) return res.status(404).send('SubCategory not found');
      res.status(200).send('SubCategory deleted');
    } catch (err) {
      res.status(400).send(err);
    }
  };