import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubCategory from './SubCategory';

function AddSubCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [list, setList] = useState([]);
  console.log("lt",list)
 

  const handleSubmit = (e) => {
    e.preventDefault();
const formData={
  name,
  sequence,
  image,
  selectedCategory
}
    axios.post('http://localhost:4001/api/post/subcategory', formData,{
      headers:{
          'authentication' :  localStorage.getItem("token")
      }
  })
    .then((res) => setCategories([res.data]) )
    .catch(error => console.error('There was an error adding the category!', error));
};
 
    const fetchCategorie = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/get',{
          headers:{
              'authentication' :  localStorage.getItem("token")
          }
      });
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
    const handleCategoryChange = (e) => {
      const selectedId = e.target.value;
      setSelectedCategory(selectedId);
    };
  return (
    <div className='container'>
      {/* <SubCategory formData={formData}/> */}
      <h2>Add Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Category</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {list.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Subcategory Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Subcategory Sequence</label>
          <input type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Upload Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className='buttons'>
          <button type="submit">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/SubCategory')}>Cancel</button>
        </div>
      </form>
      
    </div>
  );
}

export default AddSubCategory;
