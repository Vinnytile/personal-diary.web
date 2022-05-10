import React from "react";
import { useNavigate } from "react-router-dom";
import './LoginSwitcherStyle.scss'

export const LoginSwitcher: React.FC = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const navigateToLoginFace = () => {
        navigate('/loginFace');
    }

    return(
        <div className="w-25 mx-auto general-form-logswitcher shadow">
            <button 
                    onClick={navigateToLogin} 
                    className="btn btn-primary logswitcher-button"
                >
                    Login with password
            </button>
            <button 
                    onClick={navigateToLoginFace} 
                    className="btn btn-primary logswitcher-button"
                >
                    Login with faceId
            </button>
        </div>
    );
}