import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import { Button } from '../components/ui';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';
import './Dashboard.css';
import TaskDetailModal from '../components/TaskDetailModal';
import TaskFormModal from '../components/TaskFormModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [filters, setFilters] = useState({
    completed: 'ALL',
    searchText: '',
  });
  
  const [sort, setSort] = useState({
    field: 'title',
    direction: 'asc'
  });

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

  const handleAddNewTask = () => {
    setCurrentTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskSubmit = (task) => {
    if (currentTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      setTasks([...tasks, task]);
    }
    
    setShowTaskForm(false);
    setCurrentTask(null);
  };

  const handleStatusChange = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];
    
    if (filters.completed !== 'ALL') {
      const isCompleted = filters.completed === 'true';
      result = result.filter(task => task.completed === isCompleted);
    }
    
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      result = result.filter(task => 
        (task.title && task.title.toLowerCase().includes(searchLower)) || 
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }
    
    result.sort((a, b) => {
      const fieldA = a[sort.field];
      const fieldB = b[sort.field];
      
      if (!fieldA && !fieldB) return 0;
      if (!fieldA) return 1;
      if (!fieldB) return -1;
      
      if (typeof fieldA === 'boolean' && typeof fieldB === 'boolean') {
        return sort.direction === 'asc' 
          ? (fieldA ? 1 : -1)  
          : (fieldA ? -1 : 1); 
      }
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sort.direction === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      return sort.direction === 'asc'
        ? fieldA - fieldB
        : fieldB - fieldA;
    });
    
    return result;
  }, [tasks, filters, sort]);

  return (
    <div className="dashboard-container">
      <div className="tasks-section">
        <div className="tasks-header">
          <h2>Görevlerim</h2>
          <div className="tasks-actions">
            <Button 
              variant="success"
              icon={<FiPlus />}
              onClick={handleAddNewTask}
              disabled={loading}
              className="dashboard-button dashboard-add-button"
            >
              Yeni Görev Ekle
            </Button>
            <Button 
              variant="info"
              icon={<FiRefreshCw />}
              onClick={fetchTasks}
              className="ml-2 dashboard-button dashboard-refresh-button"
              disabled={loading}
            >
              Yenile
            </Button>
          </div>
        </div>
        
        <TaskFilter 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        
        {showTaskForm && (
          <TaskFormModal onClose={() => setShowTaskForm(false)}>
            <TaskForm 
              task={currentTask} 
              onSubmit={handleTaskSubmit} 
              onCancel={() => setShowTaskForm(false)}
            />
          </TaskFormModal>
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
                onClick={() => setSelectedTask(task)}
              />
            ))}
          </div>
        )}
        
        {!loading && !error && tasks.length > 0 && (
          <div className="tasks-summary">
            <p>
              Toplam {tasks.length} görev | Gösterilen: {filteredAndSortedTasks.length} görev
              {filters.completed !== 'ALL' && ` | ${filters.completed === 'true' ? 'Tamamlananlar' : 'Yapılacaklar'}`}
              {filters.searchText && ` | "${filters.searchText}" için arama sonuçları`}
            </p>
          </div>
        )}
        
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 