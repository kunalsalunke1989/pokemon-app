import React from 'react';
import Home from './components/Home';
import Details from './components/Details';
import Navbar from './components/Navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        {
          (
            <div>
              <Navbar></Navbar>
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/pokemon/:id" element={<Details />}></Route>
              </Routes>
            </div>
          )
        }
      </div>
    </Router>
  );
}

export default App;
