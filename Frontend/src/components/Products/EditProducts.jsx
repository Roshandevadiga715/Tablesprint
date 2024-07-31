import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => {
        const product = response.data;
        setName(product.name);
        setStatus(product.status);
        setSelectedCategory(product.category);
        setSelectedSubcategory(product.subcategory);
      })
      .catch(error => console.error('Error fetching product:', error));

    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('/api/subcategories')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('status', status);
    formData.append('image', image);
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubcategory);

    axios.put(`/api/products/${id}`, formData)
      .then(() => navigate('/products'))
      .catch(error => console.error('There was an error updating the product!', error));
  };

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSubcategoryChange = (e) => setSelectedSubcategory(e.target.value);

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productStatus">Status</label>
          <select
            id="productStatus"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          {/* <select
            id="category"
            className="form-control"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select> */}
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">SubCategory</label>
          {/* <select
            id="subcategory"
            className="form-control"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            required
          >
            <option value="">Select SubCategory</option>
            {subcategories.map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select> */}
        </div>
        <div className="form-group">
          <label htmlFor="uploadImage">Upload Image</label>
          <input
            type="file"
            id="uploadImage"
            className="form-control-file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-secondary">Save</button>
        <button type="button" className="" onClick={() => navigate('/products')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditProducts;

