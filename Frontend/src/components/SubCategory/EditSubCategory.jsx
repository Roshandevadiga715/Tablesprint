import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState({});
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  useEffect(() => {
    axios.get(`/api/subcategories/${id}`)
      .then(response => {
        setSubcategory(response.data);
        setName(response.data.name);
        setSequence(response.data.sequence);
        setStatus(response.data.status);
      })
      .catch(error => console.error('There was an error fetching the subcategory!', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sequence', sequence);
    formData.append('status', status);
    if (image) formData.append('image', image);

    axios.put(`/api/subcategories/${id}`, formData)
      .then(response => navigate('/SubCategory'))
      .catch(error => console.error('There was an error updating the subcategory!', error));
  };

  return (
    <div className="container">
      <h2>Edit Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div div className="form-group">
          <label>Subcategory Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div div className="form-group">
          <label>Subcategory Sequence</label>
          <input type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} />
        </div>
        <div div className="form-group">
          <label>Upload Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {subcategory.image && <img src={subcategory.image} alt={subcategory.name} width="50" />}
        </div>
        <div div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="btn btn-secondary">Save</button>
        <Link to="/SubCategory" className="cancel-btn">Cancel</Link>
      </form>
    </div>
  );
}

export default EditSubCategory;
