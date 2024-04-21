import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage/UserListPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserListPage />} />
       </Routes>
      </div>
    </Router>
  );
 }

 export default App;
