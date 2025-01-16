import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Home Page/HomePage";
import UserList from "./User List/UserList";
import ActivePostcode from "./Active PostCodes/ActivePostcode";
import LoginPage from "./Login/LoginPage";
import Dashboard from "./Home Page/HomePage";

function App() {
  return (

    <Router>

      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/users" element={<UserList />} />\
        <Route path="/postcodes" element={<ActivePostcode />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>

  );
}

export default App;
