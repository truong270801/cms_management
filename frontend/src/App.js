import "./App.css";
import Login from "./Pages/Login";
import TableUser from "./Pages/Users/TableUser";
import TableStream from "./Pages/Streams/TableStream";
import CreateUser from "./Pages/Users/CreateUser";
import CreateStream from "./Pages/Streams/CreateStream";
import MonitorStream from "./Pages/Streams/MonitorStream";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";


function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/tbuser" element={<TableUser />} />
          <Route exact path="/tbstream" element={<TableStream />} />
          <Route exact path="/adduser" element={<CreateUser />} />
          <Route exact path="/addstream" element={<CreateStream />} />
          <Route exact path="/monitorstream" element={<MonitorStream />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
