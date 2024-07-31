import React,{useState} from 'react';
import { Button, Modal } from 'antd';
const LogOutConfirmation = () => {
    const [modal, setModal] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const handleConfirmDelete = () => {
      // Handle the delete action here
      console.log("Item deleted");
      setIsModalVisible(false);
    };
    return (
        <Modal
          title="Confirm Deletion"
          visible={modal}
          onOk={onConfirm}
          onCancel={onClose}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete?</p>
        </Modal>
      );
};


export default LogOutConfirmation;