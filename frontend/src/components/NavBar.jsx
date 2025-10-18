import avatarIcon from '../../public/avatar.png';
import Logo from './Logo';
import '../styles/NavBar.css';

function NavBar({ user }) {
    return (
        <nav id="navbar">
            <Logo />
            <div className="separator-vertical" />
            {user ? <p>Welcome, {user.firstName} {user.lastName}!</p> : <div id="login-button"><img src={avatarIcon} alt="Avatar" /><button>Login</button></div>}
        </nav>
    );
}

export default NavBar;