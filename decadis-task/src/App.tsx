import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage/UserListPage';
// import CreateUserPage from './pages/CreateUserPage/CreateUserPage';
// import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<UserListPage />} />
        {/* <Route path="/create-user" element={<CreateUserPage />} /> */}
        {/* <Route path="/user-details/:userId" element={<UserDetailsPage />} /> */}
        {/* Add more routes for other pages */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
