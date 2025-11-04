import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Logo from './../components/Logo';
import avatarIcon from "../../public/avatar.png";
import showPasswordIcon from "../../public/show_password.png";
import sadFaceIcon from "../../public/sad_face.png";

function Login({ setUser }) {
    const navigate = useNavigate();
    const Pages = Object.freeze({
        LOGIN: 'LOGIN',
        SIGNUP: 'SIGNUP',
    });
    const pageText = {
        LOGIN: { welcome: 'Welcome Back!', emailPlaceholder: 'Email or Lab Results Code', actionButtonText: 'SIGN IN', switchText: "Don't have an account?", switchAction: 'Sign Up' },
        SIGNUP: { welcome: 'Create Account', emailPlaceholder: 'Email', actionButtonText: 'SIGN UP', switchText: 'Already have an account?', switchAction: 'Sign In' },
    };
    const [currentPage, setCurrentPage] = useState(Pages.LOGIN);

    useEffect(() => {
        console.log("Login component mounted");
    }, []);

    const playForgotPasswordAnimation = () => {
        console.log("Forgot Password animation played");
    };

    return (
        <div id="login-page">
            <div id="bubble-1" className="login-bubble"/>
            <div id="bubble-2" className="login-bubble"/>
            <div id="bubble-3" className="login-bubble"/>
            <div id="bubble-4" className="login-bubble"/>
            <div id="login-container">
                <Logo />
                <label>{pageText[currentPage].welcome}</label>
                <div id="login-inputs">
                    
                    <div className="input-container">
                        <label>{pageText[currentPage].emailPlaceholder}</label>
                        <input type="text" />
                        <img src={avatarIcon} alt="User Avatar" />
                    </div>
                    <div className="input-container">
                        <input type="password" placeholder="Password" />
                        <img src={showPasswordIcon} alt="Toggle Password Visibility" />
                    </div>
                </div>
                <div>
                    <label id="forgot-password" onClick={playForgotPasswordAnimation} >Forgot Password?</label>
                    <img src={sadFaceIcon} alt="Functionality is a bit out of reach for the scope of the project I think." />
                </div>
                <button onClick={() => {
                    setUser({ firstName: 'John', lastName: 'Doe' });
                    navigate('/');
                }}>{pageText[currentPage].actionButtonText}</button>

                <div id="switch-between-login-and-register-container">
                    <label>{pageText[currentPage].switchText}</label>
                    <label id="register-link" onClick={() => setCurrentPage(currentPage === Pages.LOGIN ? Pages.SIGNUP : Pages.LOGIN)}>{pageText[currentPage].switchAction}</label>
                </div>
            </div>
        </div>
    );
}

export default Login;