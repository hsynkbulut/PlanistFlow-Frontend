import React from 'react';
import { FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './TaskDetailModal.css';

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="task-detail-modal-overlay" onClick={onClose}>
      <div className="task-detail-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Kapat">
          <FiX />
        </button>
        <h2>{task.title || 'İsimsiz Görev'}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          {task.completed ? (
            <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
              <FiCheckCircle style={{ marginRight: 4 }} /> Tamamlandı
            </span>
          ) : (
            <span style={{ color: '#f59e42', display: 'flex', alignItems: 'center', fontWeight: 600 }}>
              <FiAlertCircle style={{ marginRight: 4 }} /> Yapılacak
            </span>
          )}
          {task.taskNo && (
            <span style={{ background: '#f1f5f9', color: '#0ea5e9', borderRadius: 6, padding: '2px 10px', fontWeight: 500, fontSize: '0.98rem' }}>
              Görev No: {task.taskNo}
            </span>
          )}
        </div>
        <p><strong>Açıklama:</strong></p>
        <p style={{ whiteSpace: 'pre-line' }}>{task.description || 'Açıklama yok'}</p>
      </div>
    </div>
  );
};

export default TaskDetailModal; 