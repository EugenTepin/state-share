import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const { current: bChannel } = useRef(new BroadcastChannel('shared_state'));
  const dispatchState = () => {
    const color = pickColor();
    setBgColor(color);
    bChannel.postMessage({ color });
  };

  const listenState = useCallback(({ data }) => {
    setBgColor(data.color);
  }, []);

  useEffect(() => {
    bChannel.addEventListener('message', listenState)
    return () => {
      bChannel.removeEventListener('message', listenState);
      bChannel.close();
    };
  }, [listenState, bChannel]);

  return (
    <div className="app grid-container" style={{ background: bgColor }}>
      <div className="A">
        <button style={{ background: bgColor }} onClick={() => dispatchState()}> Change State </button>
      </div>
      <div className="B">
        <button style={{ background: bgColor }} onClick={() => { bChannel.removeEventListener('message', listenState) }}> Unsubscribe </button>
      </div>
    </div>
  );
}

export default App;
