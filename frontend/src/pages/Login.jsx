import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Login component mounted");
    }, []);

    return (
        <div>
            <h2>Login Component</h2>
            <button onClick={() => {
                setUser({ firstName: 'John', lastName: 'Doe' });
                navigate('/');
            }}>Login</button>
        </div>
    );
}

export default Login;