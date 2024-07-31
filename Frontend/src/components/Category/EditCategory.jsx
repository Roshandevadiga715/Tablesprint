import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditCategory() {
  const { id } = useParams(); // Fetching the category ID from the URL params
  const navigate = useNavigate();

  // State variables to manage form inputs and category details
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  const [existingImage, setExistingImage] = useState(''); 
  // Fetch category details on component mount
  useEffect(() => {
    axios.get(`http://localhost:4001/api/categories/${id}`,{
      headers:{
        'authentication' :  localStorage.getItem("token")
    }
    })
      .then(response => {
        const { name, sequence, image, status } = response.data;
        setName(name);
        setSequence(sequence);
        setStatus(status);
        setExistingImage(image);
      })
      .catch(error => console.error('Error fetching category details:', error));
  }, [id]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare form data to update category
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sequence', sequence);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Send PUT request to update category
      await axios.put(`http://localhost:4001/api/categories/${id}`, formData);
      navigate('/Category'); // Navigate back to category list after successful update
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Category Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Category Sequence</label>
          <input type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Upload Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {image && <img src={URL.createObjectURL(image)} alt="Category" width="50" />}
          {existingImage && !image && <img src={existingImage} alt="Existing Category" width="50" />}
        </div>
        <div className='form-group'>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option className="" value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button className='buttons' type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditCategory;
