import avatarIcon from '../../public/avatar.png';
import Logo from './Logo';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';
import locationIcon from '../../public/location.png';
import bulgarianFlagIcon from '../../public/bg_flag.png';
import employeeListIcon from '../../public/employee_list.png';
import labResultsIcon from '../../public/lab_results.png';
import reportsIcon from '../../public/reports.png';
import NavBarSearch from './NavBarSearch';

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
            {!user ? <div id="login-button" className="navbar-buttons-container" onClick={() => {navigate('/login')}}><button><img src={avatarIcon} alt="Avatar" /><label>Login</label></button></div> :
                <>
                    <NavBarSearch />
                    <div className="navbar-buttons-container">
                        <button onClick={() => {navigate('/employee-list')}}>
                            <img src={employeeListIcon} alt="Employee List Icon" />
                            <label>Employee List</label>
                        </button>
                        <button onClick={() => {navigate('/lab-results')}}>
                            <img src={labResultsIcon} alt="Lab Results Icon" />
                            <label>Lab Results</label>
                        </button>
                        <button onClick={() => {navigate('/reports')}}>
                            <img src={reportsIcon} alt="Reports Icon" />
                            <label>Reports</label>
                        </button>
                    </div>
                    {/* <p>Welcome, {user.firstName} {user.lastName}!</p> */}
                </>
            }
        </nav>
    );
}

export default NavBar;