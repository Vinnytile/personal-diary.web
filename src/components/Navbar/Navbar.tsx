import React from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";
import './NavbarStyle.scss'

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const loginClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        navigate('/loginSwitcher')
    }

    const logoutClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        AuthApi.logout();
    }

    const registerClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        navigate('/register')
    }

    return (
            <nav className="navbar navbar-light navbar-general fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/notes">Personal Diary</a>
                    <div className="navbar-content">
                        <button className="navbar-button" onClick={loginClickHandler}>Login</button>
                        <button className="navbar-button" onClick={registerClickHandler}>Register</button>
                        <button className="navbar-button" onClick={logoutClickHandler}>Logout</button>
                    </div>
                </div>
            </nav>
    );
}