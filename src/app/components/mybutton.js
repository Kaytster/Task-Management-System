// components/MyButton.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS if you're using it

const MyButton = ({ onClick, children }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;
