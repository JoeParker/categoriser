import React from 'react';
import '../App.css';
import Category from './Category';
import TimerSettings from './TimerSettings';

function App() {
  return (
    <div className="App">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      <h2>The category is...</h2>
      <Category />
      <TimerSettings />
    </div>
  );
}

export default App;
