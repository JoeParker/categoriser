import React from 'react';
import '../App.css';
import Category from './Category';

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
      <a
        href="https://pixabay.com/"
        target="_blank">
        <img 
          src="https://pixabay.com/static/img/logo.png"
          alt="Pixabay" 
          height="25px"
        />
      </a>
    </div>
  );
}

export default App;
