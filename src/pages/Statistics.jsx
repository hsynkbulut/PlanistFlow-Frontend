import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services';
import { FiCheckCircle, FiClock, FiCalendar, FiList } from 'react-icons/fi';
import './Statistics.css';

const Statistics = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await taskService.getAllTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Görev verileri alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  const recentTasks = tasks.filter(task => {
    if (!task.taskNo) return false;
    

    const dateStr = task.taskNo.substring(0, 8); 
    
    if (dateStr.length < 8) return false;
    
    try {
      const year = parseInt(dateStr.substring(0, 4));
      const month = parseInt(dateStr.substring(4, 6)) - 1; 
      const day = parseInt(dateStr.substring(6, 8));
      
      const taskDate = new Date(year, month, day);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      return taskDate >= oneWeekAgo;
    } catch (e) {
      return false;
    }
  }).length;

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h1>Görev İstatistikleri</h1>
      </div>

      {loading && <div className="statistics-loading">İstatistikler yükleniyor...</div>}
      
      {error && <div className="statistics-error">{error}</div>}
      
      {!loading && !error && (
        <div className="statistics-content">
          <div className="statistics-summary">
            <h2>Genel Bakış</h2>
            <div className="stats-cards">
              <div className="stat-card total">
                <div className="stat-icon">
                  <FiList />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{totalTasks}</div>
                  <div className="stat-label">Toplam Görev</div>
                </div>
              </div>
              
              <div className="stat-card completed">
                <div className="stat-icon">
                  <FiCheckCircle />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{completedTasks}</div>
                  <div className="stat-label">Tamamlanan</div>
                </div>
              </div>
              
              <div className="stat-card pending">
                <div className="stat-icon">
                  <FiClock />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{pendingTasks}</div>
                  <div className="stat-label">Bekleyen</div>
                </div>
              </div>
              
              <div className="stat-card recent">
                <div className="stat-icon">
                  <FiCalendar />
                </div>
                <div className="stat-info">
                  <div className="stat-value">{recentTasks}</div>
                  <div className="stat-label">Son 7 Gün</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="statistics-charts">
            <div className="chart-container">
              <h3>Tamamlanma Oranı</h3>
              <div className="progress-container">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${completionRate}%` }}
                    title={`${completionRate}% tamamlandı`}
                  >
                    <span className="progress-text">{completionRate}%</span>
                  </div>
                </div>
                <div className="progress-label">
                  {completionRate < 30 && "Geliştirilmesi gerekiyor"}
                  {completionRate >= 30 && completionRate < 60 && "İyi gidiyorsunuz"}
                  {completionRate >= 60 && completionRate < 80 && "Çok iyi!"}
                  {completionRate >= 80 && "Mükemmel!"}
                </div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Görev Dağılımı</h3>
              <div className="pie-chart-container">
                <div className="pie-chart">
                  <div className="pie-slice completed" style={{ 
                    transform: `rotate(0deg)`, 
                    display: totalTasks === 0 ? 'none' : 'block',
                    clipPath: totalTasks === 0 ? 'none' : 
                      completedTasks === totalTasks ? 'circle(50%)' : 
                      `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(completionRate * 0.01 * 2 * Math.PI)}% ${50 - 50 * Math.cos(completionRate * 0.01 * 2 * Math.PI)}%, 50% 50%)`
                  }}></div>
                  <div className="pie-slice pending" style={{ 
                    transform: `rotate(${completionRate * 3.6}deg)`, 
                    display: totalTasks === 0 ? 'none' : 'block',
                    clipPath: totalTasks === 0 ? 'none' : 
                      pendingTasks === totalTasks ? 'circle(50%)' : 
                      `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((100 - completionRate) * 0.01 * 2 * Math.PI)}% ${50 - 50 * Math.cos((100 - completionRate) * 0.01 * 2 * Math.PI)}%, 50% 50%)`
                  }}></div>
                  {totalTasks === 0 && (
                    <div className="pie-empty">Görev yok</div>
                  )}
                </div>
                {totalTasks > 0 && (
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color completed"></span>
                      <span className="legend-label">Tamamlanan: {completedTasks}</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color pending"></span>
                      <span className="legend-label">Bekleyen: {pendingTasks}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="statistics-tips">
            <h3>Verimlilik İpuçları</h3>
            <ul>
              <li>
                <span className="tip-icon">💡</span>
                <span className="tip-text">Verimlilik için büyük görevleri daha küçük parçalara bölün.</span>
              </li>
              <li>
                <span className="tip-icon">⏱️</span>
                <span className="tip-text">Görevlerinizi düzenli olarak tamamlayarak motivasyonunuzu yüksek tutun.</span>
              </li>
              <li>
                <span className="tip-icon">📋</span>
                <span className="tip-text">Önemli görevleri ertelemeyin, önceliklendirilmiş bir görev listesi oluşturun.</span>
              </li>
              {completionRate < 30 && (
                <li className="warning-tip">
                  <span className="tip-icon">⚠️</span>
                  <span className="tip-text">Tamamlanma oranınız düşük! Daha küçük ve ulaşılabilir görevler oluşturmayı deneyin.</span>
                </li>
              )}
              {completionRate > 80 && (
                <li className="success-tip">
                  <span className="tip-icon">🎉</span>
                  <span className="tip-text">Harika iş! Görevlerinizi başarıyla tamamlıyorsunuz.</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics; 