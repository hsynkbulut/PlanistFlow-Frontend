import { useState, useEffect } from 'react';
import { taskService } from '../services';

const TaskForm = ({ task = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Eğer task prop'u varsa (düzenleme modunda), form verilerini doldur
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Checkbox için checked değerini, diğer input'lar için value değerini kullan
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (task) {
        // Düzenleme modu
        result = await taskService.updateTask(task.id, formData);
      } else {
        // Ekleme modu - completed alanını gönderme (backend default false atıyor)
        const { completed, ...createData } = formData;
        result = await taskService.createTask(createData);
      }
      
      onSubmit(result);
    } catch (err) {
      setError('Görev kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Task save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{task ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Görev Başlığı*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Açıklama*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            disabled={loading}
          />
        </div>
        
        {task && (
          <div className="form-group checkbox-group">
            <label htmlFor="completed" className="checkbox-container">
              <input
                type="checkbox"
                id="completed"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="checkbox-label">Tamamlandı</span>
            </label>
          </div>
        )}
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onCancel} 
            className="cancel-button"
            disabled={loading}
          >
            İptal
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Kaydediliyor...' : task ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 