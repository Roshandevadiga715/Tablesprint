import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

import axios from 'axios';

function SubCategory() {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [modal,setModal] = useState(false);
  console.log("listdata",list)
  console.log("data",data)

  const handleDeleteClick = (id) => {
    setModal(!modal);
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };
  const onClose=()=>{
    setModal(false);
      }

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:4001/subcategories/${deleteId}`,{
      headers:{
          'authentication' :  localStorage.getItem("token")
      }
  })
      .then(response => {
        console.log("res",response.data)
        const deleetData=data.filter(subcategory => subcategory._id !== deleteId)
        setData(deleetData);
        setShowDeleteConfirmation(false);
        setModal(false);
        setDeleteId(null);
      })
      .catch(error => console.error('There was an error deleting the subcategory!', error));
  };

  // const handleDeleteCancel = () => {
  //   setShowDeleteConfirmation(false);
  //   setDeleteId(null);
  // };

  const filteredSubcategories = data.filter(subcategory =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("file",filteredSubcategories)
  useEffect(()=>{
    axios.get('http://localhost:4001/api/getsub',{
      headers:{
          'authentication' :  localStorage.getItem("token")
      }
  })
   .then((res) => setData(res.data) )
   .catch(error => console.error('There was an error fetching the categories!', error));
  },[])
  useEffect(()=>{
  axios.get('http://localhost:4001/api/get',{
    headers:{
        'authentication' :  localStorage.getItem("token")
    }
})
  .then((res) => setList(res.data) )
  .catch(error => console.error('There was an error fetching the categories!', error));
 },[])


  return (
    <div className="container">
      <div className='Category-Nav'>
        <button type="button" className="Exit" onClick={() => navigate('/Category')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        <h2>SubCategory</h2>
        <div className="Search-bar">
          <input
            type="text"
            placeholder="Search by subcategory name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/SubCategory/add" className="Add-nav">Add SubCategory</Link>
      </div>
      <table className="Category-table">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>SubCategory name</th>
            <th>Category name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Sequence</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
           filteredSubcategories.map((subcategory) => {
             const categoryName = list.filter((category) => {
               return subcategory.selectedCategory === category._id
             })
             const name = categoryName.map((ele) => {
              return ele.name
            })
            return(
              <tr key={subcategory._id}>
                {/* <td>{subcategory._id}</td> */}
                <td>{subcategory.name}</td>
                <td>{name}</td>
                <td><img src={subcategory.image || 'placeholder.png'} alt={subcategory.image} width="50" /></td>
                <td>{subcategory.status}</td>
                <td>{subcategory.sequence}</td>
                <td>
             <div className='deletedit'>
             <Link to="/SubCategory/edit/:id"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></Link>
                  <button onClick={() => handleDeleteClick(subcategory._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
             </div>
                </td>
              </tr>
            )
         })
        }
        </tbody>
      </table>
         <Modal
     title="Confirm Deletion"
     visible={modal}
     onOk={handleDeleteConfirm}
     onCancel={onClose}
     okText="Delete"
     cancelText="Cancel"
   >
     <p>Are you sure you want to Delete?</p>
   </Modal>
    </div>
  );
}

export default SubCategory;
