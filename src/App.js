import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Homepage />}/>
      </Routes>
    </div>
  );
}

export default App;
