import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage/UserListPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserListPage />} />
          {/* <Route path="/create-user" element={<CreateUserPage />} /> */}
          {/* <Route path="/user-details/:userId" element={<UserDetailsPage />} /> */}
       </Routes>
      </div>
    </Router>
  );
 }

 export default App;
