import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import TbUser from './Pages/TbUser';
import TbStream from './Pages/TbStream';
import AddUser from './Pages/AddUser';
import AddStream from './Pages/AddStream'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';


function App() {
  
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/tbuser" element={<TbUser/>}/>
        <Route exact path="/tbstream" element={<TbStream/>}/>
        <Route exact path="/adduser" element={<AddUser/>}/>
        <Route exact path="/addstream" element={<AddStream/>}/>
        </Routes>
    </UserProvider>
  </Router>
  );
}

export default App;
