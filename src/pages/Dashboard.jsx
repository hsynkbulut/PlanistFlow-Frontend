import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  // Filtreleme ve sıralama state'leri
  const [filters, setFilters] = useState({
    completed: 'ALL',
    searchText: '',
  });
  
  const [sort, setSort] = useState({
    field: 'title',
    direction: 'asc'
  });

  // Görevleri getir
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Görevler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Yeni görev ekleme modunu başlat
  const handleAddNewTask = () => {
    setCurrentTask(null);
    setShowTaskForm(true);
  };

  // Düzenleme modunu başlat
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowTaskForm(true);
  };

  // Görev silme işlemi
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Form gönderildiğinde
  const handleTaskSubmit = (task) => {
    if (currentTask) {
      // Düzenleme modu
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      // Ekleme modu
      setTasks([...tasks, task]);
    }
    
    setShowTaskForm(false);
    setCurrentTask(null);
  };

  // Görev durumu değiştiğinde
  const handleStatusChange = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Filtreleme değişikliği
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Sıralama değişikliği
  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  // Filtrelenmiş ve sıralanmış görevler
  const filteredAndSortedTasks = useMemo(() => {
    // Önce filtreleme
    let result = [...tasks];
    
    // Durum filtreleme
    if (filters.completed !== 'ALL') {
      const isCompleted = filters.completed === 'true';
      result = result.filter(task => task.completed === isCompleted);
    }
    
    // Metin araması filtreleme
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      result = result.filter(task => 
        (task.title && task.title.toLowerCase().includes(searchLower)) || 
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Sıralama
    result.sort((a, b) => {
      const fieldA = a[sort.field];
      const fieldB = b[sort.field];
      
      // Null veya undefined değerleri kontrol et
      if (!fieldA && !fieldB) return 0;
      if (!fieldA) return 1;
      if (!fieldB) return -1;
      
      // Boolean karşılaştırması
      if (typeof fieldA === 'boolean' && typeof fieldB === 'boolean') {
        return sort.direction === 'asc' 
          ? (fieldA ? 1 : -1)  // false önce, true sonra (yapılacak → tamamlandı)
          : (fieldA ? -1 : 1); // true önce, false sonra (tamamlandı → yapılacak)
      }
      
      // String karşılaştırması
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sort.direction === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      // Sayı karşılaştırması
      return sort.direction === 'asc'
        ? fieldA - fieldB
        : fieldB - fieldA;
    });
    
    return result;
  }, [tasks, filters, sort]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Görev Yönetimi</h1>
        <div className="dashboard-actions">
          <Link to="/profile" className="btn btn-outline-primary">
            Profil
          </Link>
          <Link to="/statistics" className="btn btn-info ml-2">
            İstatistikler
          </Link>
          <Link to="/help" className="btn btn-outline-secondary ml-2">
            Yardım
          </Link>
          <button className="btn btn-danger ml-2" onClick={logout}>
            Çıkış
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Görevlerim</h2>
            <button 
              onClick={handleAddNewTask} 
              className="add-task-button"
              disabled={loading}
            >
              Yeni Görev Ekle
            </button>
          </div>
          
          {/* Filtreleme ve sıralama bileşeni */}
          <TaskFilter 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          
          {showTaskForm && (
            <TaskForm 
              task={currentTask} 
              onSubmit={handleTaskSubmit} 
              onCancel={() => setShowTaskForm(false)}
            />
          )}
          
          {loading && <p>Görevler yükleniyor...</p>}
          
          {error && <div className="error-message">{error}</div>}
          
          {!loading && !error && filteredAndSortedTasks.length === 0 && (
            <div className="no-tasks-message">
              {tasks.length === 0 ? (
                <p>Henüz görev bulunmamaktadır.</p>
              ) : (
                <p>Filtrelere uygun görev bulunamadı.</p>
              )}
            </div>
          )}
          
          {!loading && !error && filteredAndSortedTasks.length > 0 && (
            <div className="tasks-list">
              {filteredAndSortedTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
          
          {/* Görev sayısı bilgisi */}
          {!loading && !error && tasks.length > 0 && (
            <div className="tasks-summary">
              <p>
                Toplam {tasks.length} görev | Gösterilen: {filteredAndSortedTasks.length} görev
                {filters.completed !== 'ALL' && ` | ${filters.completed === 'true' ? 'Tamamlananlar' : 'Yapılacaklar'}`}
                {filters.searchText && ` | "${filters.searchText}" için arama sonuçları`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 