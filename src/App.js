import React, { useState, useEffect } from 'react';
import './App.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function pickColor() {
  const colors = ['gold', 'royalblue', 'tomato', 'teal', 'darkgrey'];
  return colors[getRandomInt(0, colors.length)];
}

function App(worker) {
  const [bgColor, setBgColor] = useState('tomato');

  useEffect(() => {
    return () => {
    };
  });

  return (
    <div className="app grid-container" style={{ background: bgColor }}>
      <div className="A">
        <button style={{ background: bgColor }} onClick={() => setBgColor(pickColor())}> Change State </button>
      </div>
      <div className="B">
        <button style={{ background: bgColor }} onClick={() => {}}> Unsubscribe </button>
      </div>
    </div>
  );
}

export default App;
