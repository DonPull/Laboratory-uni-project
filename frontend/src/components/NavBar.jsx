import avatarIcon from '../../public/avatar.png';
import Logo from './Logo';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import locationIcon from '../../public/location.png';
import bulgarianFlagIcon from '../../public/bg_flag.png';

function NavBar({ user }) {
    const navigate = useNavigate();

    return (
        <nav id="navbar">
            <Logo scale={0.75} />
            <div className="separator-vertical" />
            <div id="navbar-our-location-container" className='column'>
                <div>
                    <img src={locationIcon} alt="Location Icon" />
                    <label>Find us in</label>
                </div>
                <div>
                    <img src={bulgarianFlagIcon} alt="Bulgarian Flag Icon" style={{ "opacity": 0 }} />
                    <label>Sofia, BG</label>
                </div>
            </div>
            {!user ? <div id="login-button"><img src={avatarIcon} alt="Avatar" /><button onClick={() => {navigate('/login')}}>Login</button></div> :
                <>
                    <Search />
                    <div className="navbar-buttons-container">
                        <button onClick={() => {navigate('/employee-list')}}>Employee List</button>
                        <button onClick={() => {navigate('/lab-results')}}>Lab Results</button>
                        <button onClick={() => {navigate('/reports')}}>Reports</button>
                    </div>
                    {/* <p>Welcome, {user.firstName} {user.lastName}!</p> */}
                </>
            }
        </nav>
    );
}

export default NavBar;