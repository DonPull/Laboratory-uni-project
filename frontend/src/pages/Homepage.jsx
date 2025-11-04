import NavBar from '../components/NavBar';
import Table from '../components/Table';
import '../styles/Homepage.css';

function Homepage({ user }) {
    return (
        <main id="homepage">
            <div className="user-greeting">
                {user ? <h1>Welcome, {user.firstName} {user.lastName}!</h1> : <h1>Please log in to continue.</h1>}
            </div>
        </main>
    );
}

export default Homepage;