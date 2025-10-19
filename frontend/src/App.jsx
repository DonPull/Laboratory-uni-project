import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/common.css';
import Login from './pages/Login.jsx';
import Homepage from './pages/Homepage.jsx';
import LabResults from './pages/LabResults.jsx';
import EmployeeList from './pages/EmployeeList.jsx';
import Reports from './pages/Reports.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  const [user, setUser] = useState(undefined);
  // const [user, setUser] = useState({
  //   firstName: 'John',
  //   lastName: 'Doe'
  // });

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login setUser={setUser} />} 
        />
        <Route 
          path="/" 
          element={
            <>
              <NavBar user={user} />
              <Homepage user={user} />
            </>
          } 
        />
        <Route 
          path="/lab-results" 
          element={
            <>
              <NavBar user={user} />
              <LabResults />
            </>
          } 
        />
        <Route 
          path="/employee-list" 
          element={
            <>
              <NavBar user={user} />
              <EmployeeList />
            </>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <>
              <NavBar user={user} />
              <Reports />
            </>
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;