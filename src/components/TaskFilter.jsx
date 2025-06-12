import { useState } from 'react';

const TaskFilter = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    completed: 'ALL',
    searchText: '',
  });
  
  const [sortOption, setSortOption] = useState('title-asc');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    const updatedFilters = { ...filters, searchText };
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    
    if (onSortChange) {
      const [field, direction] = value.split('-');
      onSortChange({ field, direction });
    }
  };

  const handleReset = () => {
    const resetFilters = {
      completed: 'ALL',
      searchText: '',
    };
    
    setFilters(resetFilters);
    setSortOption('title-asc');
    
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
    
    if (onSortChange) {
      onSortChange({ field: 'title', direction: 'asc' });
    }
  };

  return (
    <div className="task-filter">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="searchText">Görev Ara</label>
          <input
            type="text"
            id="searchText"
            placeholder="Görev başlığı veya açıklaması..."
            value={filters.searchText}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="completed">Durum</label>
          <select
            id="completed"
            name="completed"
            value={filters.completed}
            onChange={handleFilterChange}
          >
            <option value="ALL">Tümü</option>
            <option value="false">Yapılacak</option>
            <option value="true">Tamamlandı</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sortOption">Sıralama</label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="title-asc">Başlık (A → Z)</option>
            <option value="title-desc">Başlık (Z → A)</option>
            <option value="taskNo-asc">Görev No (Artan)</option>
            <option value="taskNo-desc">Görev No (Azalan)</option>
            <option value="completed-asc">Durum (Yapılacak → Tamamlandı)</option>
            <option value="completed-desc">Durum (Tamamlandı → Yapılacak)</option>
          </select>
        </div>
        
        <button 
          className="filter-reset-button"
          onClick={handleReset}
        >
          Filtreleri Sıfırla
        </button>
      </div>
    </div>
  );
};

export default TaskFilter; 