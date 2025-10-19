import NavBar from '../components/NavBar';

function Homepage({ user }) {
    return (
        <main id="homepage">
            {user ? <div><h1>Welcome, {user.firstName} {user.lastName}!</h1></div> : <div><h1>Please log in to continue.</h1></div>}
        </main>
    );
}

export default Homepage;