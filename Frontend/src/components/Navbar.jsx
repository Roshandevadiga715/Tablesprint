import React,{useState,useEffect} from 'react'
import axios from 'axios';
import LogOutConfirmation from './LogOutConfirmation'
import { Button, Modal } from 'antd';
import { useNavigate ,Link } from 'react-router-dom';
function Navbar({ setIsLoggedIn}) {
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);
  const [isLoggedIn, setLoginStatus] = useState(localStorage.getItem("token") !== null);
  console.log("navbar",list)
    const showModal = () => {
      setModal(!modal);
    };
    const onConfirm = () => {
     localStorage.removeItem("token")
     setList([])
      setIsLoggedIn(false); 
      setLoginStatus(false);    
      useNavigate('/')
     
    };
    const onClose=()=>{
 setModal(false);
    }
    useEffect(() => {
      if (isLoggedIn) {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:4001/api/get', {
              headers: {
                'authentication': localStorage.getItem("token")
              }
            });
            setList([]); // Assuming the API returns the list data
          } catch (error) {
            console.error('There was an error fetching the categories!', error);
          }
        };
  
        fetchData();
      } else {
        setList([res.data]);
      }
    }, [isLoggedIn]);
  return (
    <div className='nav'>
    
        <div className="Nav-icon">
          <div className="w-9 rounded-full m-2 px-4 pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
          </svg>
          </div>
    <div className="flex-1 font-bold p-1">
      <a className="text-xl font-bold cursor-pointer">TableSprint</a>
    </div>
    <div >
      <button onClick={showModal} 
      
                        > 
                      
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" className="Nav-item" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
      </svg>
      </button>
    </div>
      </div><Modal
          title="Confirm Deletion"
          visible={modal}
          onOk={onConfirm}
          onCancel={onClose}
          okText="Logout"
          cancelText="Cancel"
        >
          <p>Are you sure you want to Logout?</p>
        </Modal>
    </div>
  )
}

export default Navbar
