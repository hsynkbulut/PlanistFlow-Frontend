import { useState } from 'react';
import { taskService } from '../services';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  
  // Tamamlanma durumunu değiştir
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
  
  // Görevi sil
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

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <h3>{task.title || 'İsimsiz Görev'}</h3>
      <p>{task.description || 'Açıklama yok'}</p>
      
      <div className="task-details">
        <div className="status-container">
          <label className="completed-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleCompletedChange}
              disabled={loading}
            />
            <span className="checkbox-label">
              {task.completed ? 'Tamamlandı' : 'Yapılacak'}
            </span>
          </label>
        </div>
        
        {task.taskNo && (
          <span className="task-number">
            Görev No: {task.taskNo}
          </span>
        )}
      </div>
      
      <div className="task-actions">
        <button 
          onClick={() => onEdit(task)} 
          className="edit-button"
          disabled={loading}
        >
          Düzenle
        </button>
        <button 
          onClick={handleDelete} 
          className="delete-button"
          disabled={loading}
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 