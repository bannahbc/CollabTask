// src/components/CreateButton.js
import React from 'react';

function CreateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Create Task
    </button>
  );
}

export default CreateButton;
