import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubcategory] = useState('');
const[list, setList] = useState([])
const[SubData, setSubData] = useState([])
  const fetchCategorie = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/get',{
        headers:{
            'authentication' :  localStorage.getItem("token")
        }
    });
      // Ensure unique categories by using a Set
      const uniqueCategories = Array.from(new Set(response.data.map(category => category.name)))
        .map(name => {
          return response.data.find(category => category.name === name);
        });
      setList(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategorie();
  }, []);
  const fetchSubCategorie = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/getsub',{
        headers:{
            'authentication' :  localStorage.getItem("token")
        }
    });
      // Ensure unique categories by using a Set
      const uniqueCategories = Array.from(new Set(response.data.map(category => category.name)))
        .map(name => {
          return response.data.find(category => category.name === name);
        });
        setSubData(uniqueCategories);
        console.log('BBBb',SubData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchSubCategorie();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = 
   {
    name,
    sequence,
    image,
    selectedCategory,
    selectedSubCategory
   }
   console.log("foermdata", formData);
   axios.post('http://localhost:4001/api/products', formData,{
    headers:{
        'authentication' :  localStorage.getItem("token")
    }
})
   .then((res) => setProduct([res.data]) )
   .catch(error => console.error('There was an error adding the category!', error));
};

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSubcategoryChange = (e) => setSelectedSubcategory(e.target.value);

  return (
    <div className='container'>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div className='form-group'>
          <label htmlFor="productSequence">Product Sequence</label>
          <input
            type="number"
            id="productSequence"
            className="form-control"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="form-control"
            value={selectedCategory}
            onChange={handleCategoryChange}
        
          >
            <option value="">Select Category</option>
            {list.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="subcategory">SubCategory</label>
          <select
            id="subcategory"
            className="form-control"
            value={selectedSubCategory}
            onChange={handleSubcategoryChange}
         
          >
            <option value="">Select SubCategory</option>
            {SubData.map(subcategory1=> (
              <option key={subcategory1._id} value={subcategory1._id}>{subcategory1.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="uploadImage">Upload Image</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className='buttons'>
          <button type="button" className="" onClick={() => navigate('/products')}>Cancel</button>
          <button type="submit" className="btn btn-secondary">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;


