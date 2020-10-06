import React, { useState, useEffect } from 'react';
import './App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function pickColor() {
  const colors = ['gold', 'royalblue', 'tomato', 'teal', 'darkgrey', 'firebrick', 'mediumspringgreen', 'mediumslateblue', 'indigo', 'maroon'];
  return colors[getRandomInt(0, colors.length)];
}

function App() {
  const [bgColor, setBgColor] = useState('tomato');
  const [subscribed, setSubscription] = useState(true);

  function dispatchState() {
    const color = pickColor();
    setBgColor(color);
    window.localStorage.setItem('color', JSON.stringify({ value: color }));
  }

  const handler = (e) => {
    const { value } = JSON.parse(e.newValue);
    setBgColor(value)
  };

  const unsubscribe = () => {
    window.removeEventListener('storage', handler);
    setSubscription(false);
  }

  useEffect(() => {
    if (subscribed) {
      window.addEventListener('storage', handler);
      return () => {
        window.removeEventListener('storage', handler);
      };
    }
  });

  return (
    <div className="app grid-container" style={{ background: bgColor }}>
      <div className="A">
        <button style={{ background: bgColor }} onClick={() => dispatchState()}> Change State </button>
      </div>
      <div className="B">
        <button style={{ background: bgColor }} onClick={() => unsubscribe()}> Unsubscribe </button>
      </div>
    </div>
  );
}

export default App;
