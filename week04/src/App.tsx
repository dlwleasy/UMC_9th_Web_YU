import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login';

function App() {
  const handleLogin = async ({ email, password }) => {
    
    console.log('App에서 로그인 데이터 처리:', email, password);
    
    alert('로그인 성공! ');
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
}


const Sidebar = ({ items = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '← 닫기' : '→ 열기'}
      </button>
      <ul className="menu-list">
        {items.map((item, idx) => (
          <li key={idx}
              className="menu-item"
              onClick={() => onSelect && onSelect(item)}>
            {item.icon && <span className="icon">{item.icon}</span>}
            <span className="label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App
