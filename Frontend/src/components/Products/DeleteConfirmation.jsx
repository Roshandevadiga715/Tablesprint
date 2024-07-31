import React from 'react';

function DeleteConfirmation({ message, onDelete, onCancel }) {
  return (
    <div className="confirmation-modal">
      <p>{message}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default DeleteConfirmation;

