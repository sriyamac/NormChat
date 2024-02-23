import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

const Home = () => (
  <div className="container text-center mt-5">
    <h1>NormChat</h1>
    <Link to="/login" className="btn btn-primary">Let's get Started</Link>
    <p className="mt-3">Created by students for students to answer all UNC Charlotte-related questions.</p>
  </div>
);

export default App;
