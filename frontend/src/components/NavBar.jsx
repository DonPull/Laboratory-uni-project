import avatarIcon from '../../public/avatar.png';
import Logo from './Logo';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar({ user }) {
    const navigate = useNavigate();

    return (
        <nav id="navbar">
            <Logo />
            <div className="separator-vertical" />
            {!user ? <div id="login-button"><img src={avatarIcon} alt="Avatar" /><button onClick={() => {navigate('/login')}}>Login</button></div> : 
                <div className= "navbar-button">
                    <button onClick={() => {navigate('/employee-list')}}>Employee List</button>
                    <button onClick={() => {navigate('/lab-results')}}>Lab Results</button>
                    <button onClick={() => {navigate('/reports')}}>Reports</button>
                    <p>Welcome, {user.firstName} {user.lastName}!</p>
                </div>
            }
        </nav>
    );
}

export default NavBar;