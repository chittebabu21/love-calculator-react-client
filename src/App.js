import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Terms from './Terms';

function App() {
  return (
    <div className="App">
      <div className="d-flex justify-content-center align-items-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={ Home } />
            <Route path="/terms" Component={ Terms } />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
