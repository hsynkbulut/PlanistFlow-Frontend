import { useState } from 'react';
import { taskService } from '../services';
import { FiEdit, FiTrash2, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onClick }) => {
  const [loading, setLoading] = useState(false);
  
  const handleCompletedChange = async (e) => {
    const completed = e.target.checked;
    setLoading(true);
    
    try {
      const updatedTask = await taskService.updateTask(task.id, {
        ...task,
        completed: completed
      });
      
      if (onStatusChange) {
        onStatusChange(updatedTask);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      setLoading(true);
      
      try {
        await taskService.deleteTask(task.id);
        
        if (onDelete) {
          onDelete(task.id);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const truncateTitle = (title, maxLength = 25) => {
    if (!title) return 'İsimsiz Görev';
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const truncateDescription = (description, maxLength = 80) => {
    if (!description) return 'Açıklama yok';
    return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
  };

  return (
    <div 
      className={`task-card ${task.completed ? 'task-completed' : 'task-pending'}`}
      onClick={e => {
        if (e.target.tagName !== 'BUTTON' && onClick) onClick();
      }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="task-card-header">
        <h3 className="task-title" title={task.title || 'İsimsiz Görev'}>
          {truncateTitle(task.title)}
        </h3>
        <div className="task-status">
          {task.completed ? (
            <span className="status-badge completed">
              <FiCheckCircle /> Tamamlandı
            </span>
          ) : (
            <span className="status-badge pending">
              <FiAlertCircle /> Yapılacak
            </span>
          )}
        </div>
      </div>
      
      <div className="task-content">
        <p className="task-description" title={task.description || 'Açıklama yok'}>
          {truncateDescription(task.description)}
        </p>
      </div>
      
      {task.taskNo && (
        <div className="task-meta">
          <span className="task-number">
            Görev No: {task.taskNo}
          </span>
        </div>
      )}
      
      <div className="task-footer">
        <div className="task-checkbox">
          <label className="completed-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleCompletedChange}
              disabled={loading}
              className="checkbox-input"
            />
            <span className="checkbox-label">
              {task.completed ? 'Tamamlandı' : 'Tamamla'}
            </span>
          </label>
        </div>
        
        <div className="task-actions">
          <button 
            onClick={() => onEdit(task)} 
            className="action-button edit-button"
            disabled={loading}
            aria-label="Görevi düzenle"
          >
            <FiEdit />
            <span>Düzenle</span>
          </button>
          <button 
            onClick={handleDelete} 
            className="action-button delete-button"
            disabled={loading}
            aria-label="Görevi sil"
          >
            <FiTrash2 />
            <span>Sil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 