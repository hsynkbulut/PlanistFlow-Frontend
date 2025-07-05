import React from 'react';
import './TaskDetailModal.css';

const TaskFormModal = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Kapat">×</button>
      {children}
    </div>
  </div>
);

export default TaskFormModal; 