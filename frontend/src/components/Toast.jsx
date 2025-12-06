import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import '../styles/Toast.css';
import errorToastIcon from "../../public/error-toast.png";
import infoToastIcon from "../../public/info-toast.png";
import warningToastIcon from "../../public/warning-toast.png";
import successToastIcon from "../../public/success-toast.png";
import closeToastIcon from "../../public/close-toast.png";

class Toast extends Component {
    state = {
        toastRef: React.createRef(),
        closeToastRef: React.createRef(),
        closeToastCallbackFunction: this.props.closeToastCallbackFunction,
        toastMessage: this.props.toastMessage || "An unknown error occurred. Please try again later!",
        position: this.props.position || "top",
        notificationType: this.props.notificationType || "error",
        notificationDurationInMs: this.props.notificationDurationInMs + 1000 || 3500,
        // notificationDurationInMs: 250000000,
        toastTypeObj: { 
            "error": {
                icon: errorToastIcon,
                color: "#FFB7B6"
            },
            "info": {
                icon: infoToastIcon,
                color: "#B3E6F5"
            },
            "warning": {
                icon: warningToastIcon,
                color: "#FBE7C6"
            },
            "success": {
                icon: successToastIcon,
                color: "#B7F7C4"
            }
        }
    }
    
    componentDidMount(){
        let { position, toastRef, closeToastRef, toastTypeObj, closeToastCallbackFunction, notificationType, notificationDurationInMs } = this.state;
        let [ toast, closeToast ] = [ toastRef.current, closeToastRef.current ];

        // when the toast is rendered ajust the color of the toast based on the type of notification and set it in the correct position based on the position prop passed from the parent component
        toast.style.backgroundColor = toastTypeObj[notificationType].color;
        if(position.includes("bottom")){
            toast.style.top = "100%";
        }
        if(position.includes("left")){
            toast.style.left = "2rem";
        }else if(position.includes("right")){
            toast.style.right = "2rem";
        }else{
            toast.style.transform = "translateX(-50%)";
            toast.style.left = "50%";
        }

        // after the specified duration passed from the props has ran out call the callback function so that the parent component can close (unrender) the toast
        let timerId = setTimeout(() => {
            closeToastCallbackFunction();
        }, notificationDurationInMs);

        closeToast.onclick = (event) => {
            // if the user clicks the close button then instead of waiting for the toast to close by itself, close the toast right away
            clearTimeout(timerId);
            closeToastCallbackFunction();
        }
    }

    // we don't do this in the componentDidMount because we want the images that the toast uses to be loaded in fully before showing the toast
    showAndCloseToast = (toast) => {
        let { position, notificationDurationInMs } = this.state;

        function toastOpen(toast, position){
            if(position.includes("top")){
                toast.style.top = "2rem";
            }else if(position.includes("bottom")){
                toast.style.top = "calc(100% - 100px)";
            }else{
                // if it doesn't include either, default to top
                toast.style.top = "2rem";
            }
        }
        function toastClose(toast, position){
            if(position.includes("top")){
                toast.style.top = "-6.5rem";
            }else if(position.includes("bottom")){
                toast.style.top = "100%";
            }else{
                // if it doesn't include either, default to top
                toast.style.top = "-6.5rem";
            }
        }
        // here we set a 10ms timeout before popping up the toast because otherwise the css property 'transition' doesn't work and spans the element in place instead of smootly animating it (this happens only when you try to anime an element with 'transition' right after the element is rendered, which is the case here).
        setTimeout(() => { toastOpen(toast, position) }, 10);
        // here we know the duration after which the toast needs to dissappear and we know the duration of the toast open/close animation which is 500ms so we can just calculate after how much time the toast should go back to its original position (offscreen) before being unrendered 
        setTimeout(() => { toastClose(toast, position) }, notificationDurationInMs - 500);
    }
    
    render() {
        let { toastMessage, toastRef, closeToastRef, toastTypeObj, notificationType } = this.state;

        return (
            <div ref={toastRef} className='toast-notification flex'>
                <div className='toast-icon-container'>
                    <img onLoad={() => { this.showAndCloseToast(toastRef.current) }} src={toastTypeObj[notificationType].icon} />
                </div>
                <div style={{ maxWidth: "85%" }}>
                    <div className='toast-text-container flex column' style={{ width: "100%" }}>
                        <label>{notificationType.charAt(0).toUpperCase() + notificationType.slice(1)}</label>
                        <label title={toastMessage}>{toastMessage}</label>
                    </div>
                </div>
                <div ref={closeToastRef} className='toast-icon-container'>
                    <img src={closeToastIcon} />
                </div>
            </div>
        );
    }
}
 
export default Toast;