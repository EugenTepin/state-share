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
  const bc = new BroadcastChannel('shared_state');
  function dispatchState() {
    const color = pickColor();
    setBgColor(color);
    bc.postMessage({color});
  }

  function unsubscribe() {
    setSubscription(false);
    bc.close();
  }

  useEffect(() => {
    if(subscribed){
      bc.onmessage = ({data}) => {
        setBgColor(data.color);
      };
      return () => {
        bc.close();
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
