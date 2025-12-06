import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Logo from './../components/Logo';
import avatarIcon from "../../public/avatar.png";
import showPasswordIcon from "../../public/show_password.png";
import sadFaceIcon from "../../public/sad_face.png";
import penIcon from "../../public/pen.png";
import { getElementProperty, getRandomIntExcluding } from "../utils";
import Toast from './../components/Toast';

function Login({ setUser, mode, modeEnum }) {
    const navigate = useNavigate();
    const pageText = {
        LOGIN: { welcome: 'Welcome Back!', emailPlaceholder: 'Email or Lab Results Code', actionButtonText: 'SIGN IN', switchText: "Don't have an account?", switchAction: 'Sign Up' },
        SIGNUP: { welcome: 'Create Account', emailPlaceholder: 'Email', actionButtonText: 'SIGN UP', switchText: 'Already have an account?', switchAction: 'Sign In' },
    };
    const [currentPage, setCurrentPage] = useState(mode || modeEnum.LOGIN);

    const [toastObj, setToastObj] = useState({
        show: false,
        message: null,
        duration: 3000,
        type: "error"
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const [sadFaceStyle, setSadFaceStyle] = useState({ opacity: 0, transition: "none" });
    const [animationTotalTime, setAnimationTotalTime] = useState(0);
    
    const passwordVisibilityLineRef = useRef(null);
    const forgotPasswordRef = useRef(null);
    const isAnimatingRef = useRef(false); // used to prevent overlapping 'forgot password?' animations

    useEffect(() => {
        setCurrentPage(mode);

        // Clear all form fields when switching modes
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }, [mode]);

    useEffect(() => {
        if (animationTotalTime > 0) {
            const fadeInOrOutDuration = 1500;

            setSadFaceStyle({
                opacity: 1,
                transition: `${fadeInOrOutDuration}ms`
            });

            const timeVisible = Math.max(0, animationTotalTime - fadeInOrOutDuration);

            // timer 1: fade out the image
            const hideTimer = setTimeout(() => {
                setSadFaceStyle({
                    opacity: 0,
                    transition: `${fadeInOrOutDuration}ms`
                });
            }, timeVisible);

            // timer 2: RESET the state variable to 0 after the whole thing is done. if we don't do this, subsequent animations won't trigger the useEffect
            const resetStateTimer = setTimeout(() => {
                setAnimationTotalTime(0);
            }, animationTotalTime);

            return () => {
                clearTimeout(hideTimer);
                clearTimeout(resetStateTimer);
            };
        }
    }, [animationTotalTime]);


    async function playForgotPasswordAnimation(
        elementRef,
        targetText,
        {
            direction = "right",
            stepCount = 2,
            returnToOriginalDelay = 0,
            charRevealDelay = 60,
            setEstimatedDuration = null
        } = {}
    ) {
        if (!elementRef.current) return;

        const originalText = elementRef.current.innerText;
        const maxLength = Math.max(originalText.length, targetText.length);
        const letters = "abcdefghijklmnopqrstuvwxyz     "; // multiple spaces to increase chance of space being picked

        const padArray = (arr, length, dir) => {
            const padCount = length - arr.length;
            const padding = Array(padCount).fill("");
            return dir === "left" ? [...padding, ...arr] : [...arr, ...padding];
        };

        const originalArray = padArray([...originalText], maxLength, direction);
        const targetArray = padArray([...targetText], maxLength, direction);

        let revealPerStep = 0;
        let revealedLetters = 0;

        if (direction === "left") {
            for (let i = 0; i < originalArray.length; i++) {
                if (originalArray[i] !== "") {
                    revealPerStep = Math.ceil(i / stepCount);
                    revealedLetters = originalArray.length - i;
                    break;
                }
            }
        }

        if (setEstimatedDuration) {
            let totalTicks = 0;
            let revealedLettersCopy = revealedLetters;

            for(let i = 0; i < stepCount; i++) {
                revealedLettersCopy += revealPerStep;
                totalTicks += revealedLettersCopy;
            }
            let calculatedMs = totalTicks * charRevealDelay;

            // if we also reverse the animation, we add the delay + the time it takes to reverse (which should be the same time as the original animation took so we just multiply by 2)
            if (returnToOriginalDelay > 0) {
                calculatedMs = (calculatedMs * 2) + returnToOriginalDelay;
            }
            setEstimatedDuration(calculatedMs);
        }

        for (let i = 0; i < stepCount; i++) {
            let excludedIndices = [];
            revealedLetters += revealPerStep;
            for (let j = 0; j < revealedLetters; j++) {
                // logic only works for left direction for now
                let indexOfLetterToChange = getRandomIntExcluding(originalArray.length - revealedLetters, originalArray.length - 1, excludedIndices);

                if (targetArray[indexOfLetterToChange] !== originalArray[indexOfLetterToChange]) {
                    if (i === stepCount - 1) {
                        originalArray[indexOfLetterToChange] = targetArray[indexOfLetterToChange];
                    } else {
                        let captitalizeLetter = Math.random() < 0.1; // 10% chance to capitalize
                        originalArray[indexOfLetterToChange] = captitalizeLetter
                            ? letters[Math.floor(Math.random() * letters.length)].toUpperCase()
                            : letters[Math.floor(Math.random() * letters.length)];
                    }
                }
                excludedIndices.push(indexOfLetterToChange);

                elementRef.current.innerText = originalArray.join("");

                await new Promise(resolve => setTimeout(resolve, charRevealDelay));
            }
        }

        if (returnToOriginalDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, returnToOriginalDelay));
            // recursively call, but ensure we don't pass 'setEstimatedDuration' parameter so that we don't trigger the time estimation logic to avoid state conflict. Also pass 'returnToOriginalDelay' as 0 to avoid infinite loop
            await playForgotPasswordAnimation(elementRef, originalText, {
                direction,
                stepCount,
                returnToOriginalDelay: 0,
                charRevealDelay,
                setEstimatedDuration: null
            });
        }
    }

    const handleForgotPasswordClick = async () => {
        // 1. Check Lock
        if (isAnimatingRef.current) return;
        
        // 2. Set Lock
        isAnimatingRef.current = true;

        // 3. Run Animation
        await playForgotPasswordAnimation(
            forgotPasswordRef,
            "Out of scope for project. Sorry.",
            {
                direction: "left",
                stepCount: 2,
                returnToOriginalDelay: 2000,
                charRevealDelay: 30,
                setEstimatedDuration: setAnimationTotalTime
            }
        );

        // 4. Release Lock
        isAnimatingRef.current = false;
    };

    const handleAuth = async () => {
        if (!email || !password) {
            setToastObj({
                show: true,
                type: 'error',
                message: "Please fill in email and password.",
                duration: 4000
            });
            return;
        }
        if (currentPage === modeEnum.SIGNUP && (!firstName || !lastName)) {
            setToastObj({
                show: true,
                type: 'error',
                message: "Please fill in your first and last name.",
                duration: 4000
            });
            return;
        }
        try {
            if (currentPage === modeEnum.SIGNUP) {
                // --- REGISTER ---
                const payload = {
                    fullName: `${firstName} ${lastName}`,
                    email: email,
                    password: password
                };
                const response = await axios.post('http://localhost:3000/register', payload);
                
                if (response.status === 201) {
                    setToastObj({
                        show: true,
                        type: 'success',
                        message: "Account created successfully!",
                        duration: 4000
                    });

                    // clear the text from the input fields
                    setEmail("");
                    setPassword("");
                    setFirstName("");
                    setLastName("");
                }
            } else {
                // --- LOGIN ---
                const payload = {
                    email: email,
                    password: password
                };
                const response = await axios.post('http://localhost:3000/login', payload);
                
                if (response.status === 200) {
                    setUser(response.data); // Set the user in App.jsx state, aka set the global user
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Auth Error:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setToastObj({
                    show: true,
                    type: 'error',
                    message: error.response.data.error,
                    duration: 4000
                });
            } else {
                setToastObj({
                    show: true,
                    type: 'error',
                    message: "Something went wrong. Please check that the backend is running.",
                    duration: 4000
                });
            }
        }
    };

    return (
        <div id="login-page">
            {toastObj.show && <Toast position="bottom right" closeToastCallbackFunction={() => setToastObj(prev => {return {...prev, show: false}})} toastMessage={toastObj.message} notificationDurationInMs={toastObj.duration} notificationType={toastObj.type} />}

            <div id="bubble-1" className="login-bubble"/>
            <div id="bubble-2" className="login-bubble"/>
            <div id="bubble-3" className="login-bubble"/>
            <div id="bubble-4" className="login-bubble"/>
            
            <div id="login-container" onKeyDown={(e) => e.key === "Enter" && handleAuth()}>
                <Logo />
                
                <label id="welcome-message">{pageText[currentPage].welcome}</label>
                
                <div id="login-inputs" className="column">
                    <div style={ currentPage === modeEnum.LOGIN ? { display: "none" } : { justifyContent: "space-between" } }>
                        <div className={`input-container ${firstName ? "filled" : ""}`} style={{ "width": "45%" }}>
                            <label className="input-placeholder">First Name</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <img src={penIcon} style={{ "width": "21px", "height": "21px" }} />
                        </div>
                        <div className={`input-container ${lastName ? "filled" : ""}`} style={{ "width": "45%" }}>
                            <label className="input-placeholder">Last Name</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <img src={penIcon} style={{ "width": "21px", "height": "21px" }} />
                        </div>
                    </div>

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
                        <label ref={forgotPasswordRef} id="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</label>
                        <label style={{ display: "none" }}>Out of scope. Not implemented.</label>
                        <img src={sadFaceIcon} style={sadFaceStyle} alt="Functionality is a bit out of reach for the scope of the project I think." />
                    </div> : <></>
                }

                <button id="login-action-button" onClick={handleAuth}>{pageText[currentPage].actionButtonText}</button>

                <div id="switch-between-login-and-register-container">
                    <label>{pageText[currentPage].switchText}&nbsp;</label>
                    <label id="register-link" onClick={() => navigate(currentPage === modeEnum.LOGIN ? '/register' : '/login')}>{pageText[currentPage].switchAction}</label>
                </div>
            </div>
        </div>
    );
}

export default Login;