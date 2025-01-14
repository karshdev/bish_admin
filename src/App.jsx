import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Home Page/HomePage";
import UserList from "./User List/UserList";

function App() {
  return (

    <Router>

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>


  );
}

export default App;
