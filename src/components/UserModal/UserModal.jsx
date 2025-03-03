import React from "react";
import "../Admin/Modal/Modal.css";

const UserModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdro">
      <div className="modal-container">
        <button className="modal-close-btn z-3" onClick={onClose}>
          ✖
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default UserModal;
