import React from 'react';

function DeleteConfirmation({ message, onDelete, onCancel }) {
  return (
    <div className="delete-confirmation">
      <p>{message}</p>
      <div>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
