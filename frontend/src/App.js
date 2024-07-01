import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import TbUser from "./Pages/TbUser";
import TbStream from "./Pages/TbStream";
import AddUser from "./Pages/AddUser";
import AddStream from "./Pages/AddStream";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element = {<PrivateRoute> <Home /> </PrivateRoute>}/>
          <Route exact path="/tbuser" element={<PrivateRoute> <TbUser /> </PrivateRoute>}/>
          <Route exact path="/tbstream" element={<PrivateRoute> <TbStream /> </PrivateRoute>}/>
          <Route exact path="/adduser" element={<PrivateRoute> <AddUser /> </PrivateRoute>}/>
          <Route exact path="/addstream" element={<PrivateRoute> <AddStream /> </PrivateRoute>}/>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
