import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage/UserListPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<UserListPage />} />
        </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
 }

 export default App;
