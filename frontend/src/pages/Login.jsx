import React from 'react';

function Login({ setUser }) {
    return (
        <div>
            <h2>Login Component</h2>
            <button onClick={() => setUser({ firstName: 'John', lastName: 'Doe' })}>Login</button>
        </div>
    );
}

export default Login;