import React from 'react';
import './App.css';
import Routes from './container/Routes';
function App() {
  document.body.style.overflow = "hidden"
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;