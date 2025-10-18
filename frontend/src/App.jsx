import { React, useState } from 'react';
import './App.css';
import './styles/common.css';
// import './styles/NavBar.css';
import './styles/Homepage.css';
import Login from './pages/Login.jsx';
import Homepage from './pages/Homepage.jsx';

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <Homepage user={user}></Homepage>
  )
}

export default App;
