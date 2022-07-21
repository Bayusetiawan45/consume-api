import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import Register from './Register';
import Login from './Login';
import Detail from './Detail';
import ItemDetail from './ItemDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<Homepage />}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/detail/:id/item/:item_id" element={<ItemDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
