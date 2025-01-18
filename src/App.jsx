import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from "./User List/UserList";
import ActivePostcode from "./Active PostCodes/ActivePostcode";
import LoginPage from "./Login/LoginPage";
import Dashboard from "./Home Page/HomePage";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const userData = localStorage.getItem("user");
  let user = null;

  if (userData) {
    user = JSON.parse(userData);
  }

  return user ? <Component {...rest} /> : <Navigate to="/" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired
};

const userData = localStorage.getItem("user");
const isAuthenticated = !!userData;

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
       <Route path="/users" element={<ProtectedRoute element={UserList} />} />
        <Route path="/postcodes" element={<ProtectedRoute element={ActivePostcode} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
