import { useState, useEffect } from 'react'
import './App.css'
import DateInput from './DateInput'
import AgeDisplay from './AgeDisplay';

function App() {
  const savedDate = localStorage.getItem('birthDate')
  const savedTheme = localStorage.getItem('theme') || 'default'

  const [date, setDate] = useState(savedDate ? new Date(savedDate) : null);
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => prev === 'default' ? 'catppuccin' : 'default');
  }

  function clearStorage() {
    localStorage.removeItem('birthDate');
    setDate(null); 
  }

  const handleDateChange = (newDate) => {
    setDate(newDate);
    localStorage.setItem('birthDate', newDate.toISOString());
  };

  return (
    <div className="app-container">
      {date === null 
      ? <DateInput onDateChange={handleDateChange} /> 
      : <AgeDisplay birthDate={date} onClearStorage={clearStorage}/>}
      
      <div className="theme-menu-container">
        <span className="theme-label">theme: </span>
        <select 
          className="theme-select" 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="default">default</option>
          <option value="catppuccin">catppuccin</option>
        </select>
      </div>
    </div>
  )
}

export default App
