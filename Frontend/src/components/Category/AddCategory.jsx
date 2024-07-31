import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState('');
  const [image, setImage] = useState(null);
const[data,setData]=useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    const formaData={
      name,
      sequence,
      image
    }

    axios.post('http://localhost:4001/api/post', formaData,{
      headers:{
          'authentication' :  localStorage.getItem("token")
      }
  })

      .then((res) => setData([res.data]) )
      .catch(error => console.error('There was an error adding the category!', error));
  };
  useEffect(()=>{
    axios.get('http://localhost:4001/api/get',{
      headers:{
          'authentication' :  localStorage.getItem("token")
      }
  })
   .then((res) => setData(res.data) )
   .catch(error => console.error('There was an error fetching the categories!', error));
  },[])
  return (
    <div className='container'>
      <h2>Add Category</h2>
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
        </div>
        <div className='buttons'>
          <button type="button" className="" onClick={() => navigate('/Category')}>Cancel</button>
          <button type="submit" className="btn btn-secondary">Save</button>
       
        </div>
        
      </form>
    </div>
  );
}

export default AddCategory;


