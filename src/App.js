import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AddList from "./AddList";
import AddEmployees from "./addEmployees";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addEmployee" element={<AddEmployees />} />
          <Route exact path="/addItem" element={<AddList />} />
          <Route exact path="/admin" element={<Dashboard name="Admin" />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
