
import Products from '../models/Products.js';

export const createProducts = async (req, res) => {
    console.log('res',req.body)
    try {
      const category = new Products(req.body);
      await category.save();
      res.status(201).send(category);
      console.log("resp",category)
    } catch (err) {
      res.status(400).send(err);
    }
  };

  // Get all categories
export const getProducts = async (req, res) => {
    try {
      const categories = await Products.find();
      res.status(200).send(categories);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  export const deleteProducts = async (req, res) => {
    try {
      const category = await Products.findByIdAndDelete(req.params.id);
      if (!category) return res.status(404).send('Products not found');
      res.status(200).send('Products deleted');
    } catch (err) {
      res.status(400).send(err);
    }
  };