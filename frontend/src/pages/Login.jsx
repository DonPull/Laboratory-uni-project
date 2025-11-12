import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Logo from './../components/Logo';
import avatarIcon from "../../public/avatar.png";
import showPasswordIcon from "../../public/show_password.png";
import sadFaceIcon from "../../public/sad_face.png";
import { getElementProperty } from "../utils";

function Login({ setUser, mode, modeEnum }) {
    const navigate = useNavigate();
    const pageText = {
        LOGIN: { welcome: 'Welcome Back!', emailPlaceholder: 'Email or Lab Results Code', actionButtonText: 'SIGN IN', switchText: "Don't have an account?", switchAction: 'Sign Up' },
        SIGNUP: { welcome: 'Create Account', emailPlaceholder: 'Email', actionButtonText: 'SIGN UP', switchText: 'Already have an account?', switchAction: 'Sign In' },
    };
    const [currentPage, setCurrentPage] = useState(mode || modeEnum.LOGIN);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const passwordVisibilityLineRef = useRef(null);

    useEffect(() => {
        setCurrentPage(mode);
    }, [mode]);

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
                
                <label id="welcome-message">{pageText[currentPage].welcome}</label>
                
                <div id="login-inputs" className="column">
                    <div className={`input-container ${email ? "filled" : ""}`}>
                        <label className="input-placeholder">{pageText[currentPage].emailPlaceholder}</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <img src={avatarIcon} alt="User Avatar" />
                    </div>
                    <div className={`input-container ${password ? "filled" : ""}`}>
                        <label className="input-placeholder">Password</label>
                        <input type={passwordVisibility ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div id="toggle-password-visibility-line" ref={passwordVisibilityLineRef}></div>
                        <img src={showPasswordIcon} onClick={(e) => {
                            setPasswordVisibility(!passwordVisibility);
                            if(getElementProperty(passwordVisibilityLineRef.current, "opacity") === "0") {
                                passwordVisibilityLineRef.current.style.opacity = 1;
                                passwordVisibilityLineRef.current.style.transform = "translate(-10px, 16px) rotate(50deg)";
                            } else {
                                passwordVisibilityLineRef.current.style.opacity = 0;
                                passwordVisibilityLineRef.current.style.transform = "translate(-10px, 16px) rotate(90deg)";
                            }
                        }} alt="Toggle Password Visibility" />
                    </div>
                </div>

                {currentPage === modeEnum.LOGIN ?
                    <div id="forgot-password-container">
                        <label id="forgot-password" onClick={playForgotPasswordAnimation}>Forgot Password?</label>
                        <label style={{ display: "none" }}>Out of scope. Not implemented.</label>
                        <img src={sadFaceIcon} alt="Functionality is a bit out of reach for the scope of the project I think." />
                    </div> : <></>
                }

                <button id="login-action-button" onClick={() => {
                    setUser({ firstName: 'John', lastName: 'Doe' });
                    navigate('/');
                }}>{pageText[currentPage].actionButtonText}</button>

                <div id="switch-between-login-and-register-container">
                    <label>{pageText[currentPage].switchText}</label>
                    <label id="register-link" onClick={() => navigate(currentPage === modeEnum.LOGIN ? '/register' : '/login')}>{pageText[currentPage].switchAction}</label>
                </div>
            </div>
        </div>
    );
}

export default Login;