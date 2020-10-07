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
    navigator.serviceWorker.ready.then(registration => {
      registration.active.postMessage({ color });
    });
  }

  const handler = (event) => {
    setBgColor(event.data.color);
    console.log(`color: ${event.data.color}`);
  };

  function unsubscribe() {
    navigator.serviceWorker.removeEventListener('message', handler);
    setSubscription(false);
  }

  useEffect(() => {
    if (subscribed) {
      navigator.serviceWorker.addEventListener('message', handler);
      return () => {
        navigator.serviceWorker.removeEventListener('message', handler);
      }
    }
  },[]);

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
