
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import HomeTest from './HomeTest'

function App() {
  return (
    <BrowserRouter>
      <Link to="/"></Link>
      <Routes>
        <Route path="/" element={ <HomeTest/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
