import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import TableUser from "./Pages/Users/TableUser";
import TableStream from "./Pages/Streams/TableStream";
import CreateUser from "./Pages/Users/CreateUser";
import CreateStream from "./Pages/Streams/CreateStream";
import MonitorStream from "./Pages/Streams/MonitorStream";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element = {<PrivateRoute> <Home /> </PrivateRoute>}/>
          <Route exact path="/tbuser" element={<PrivateRoute> <TableUser /> </PrivateRoute>}/>
          <Route exact path="/tbstream" element={<PrivateRoute> <TableStream /> </PrivateRoute>}/>
          <Route exact path="/adduser" element={<PrivateRoute> <CreateUser /> </PrivateRoute>}/>
          <Route exact path="/addstream" element={<PrivateRoute> <CreateStream /> </PrivateRoute>}/>
          <Route exact path="/monitorstream" element={<PrivateRoute> <MonitorStream /> </PrivateRoute>}/>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
