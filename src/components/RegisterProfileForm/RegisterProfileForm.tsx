import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import './RegisterProfileFormStyle.scss';

import "react-datepicker/dist/react-datepicker.css";

type RegisterProfileFormProps = {
    onRegister(username: string, firstname: string,
        lastname: string, dateOfBirth: Date): void
}

export const RegisterProfileForm: React.FC<RegisterProfileFormProps> = ({onRegister}) => {
    const refUsername = useRef<HTMLInputElement>(null)
    const refFirstname= useRef<HTMLInputElement>(null)
    const refLastname= useRef<HTMLInputElement>(null)
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const navigate = useNavigate();

    const registerProfileClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        await onRegister(refUsername.current!.value, refFirstname.current!.value,
            refLastname.current!.value, dateOfBirth)
        
        navigate('/login');
    }

    return (
            <form className="w-25 mx-auto general-form-profile-reg shadow">
                <div className="form-group form-group-own-profile-reg">
                    <label htmlFor="username" className="form-label"> 
                        Your Username:
                    </label>
                    <input
                        ref={refUsername} 
                        type="text" 
                        id="username" 
                        placeholder="your_username"
                        className="form-control form-control-own-profile-reg"
                    />
                </div>
                <div className="form-group form-group-own-profile-reg">
                    <label htmlFor="firstname" className="form-label"> 
                        Your Firstname:
                    </label>
                    <input
                        ref={refFirstname} 
                        type="text" 
                        id="firstname" 
                        placeholder="your_firstname"
                        className="form-control form-control-own-profile-reg"
                    />
                </div>
                <div className="form-group form-group-own-profile-reg">
                    <label htmlFor="lastname" className="form-label"> 
                        Your Lastname:
                    </label>
                    <input
                        ref={refLastname} 
                        type="text" 
                        id="lastname" 
                        placeholder="your_lastname"
                        className="form-control form-control-own-profile-reg"
                    />
                </div>
                <div className="form-group form-group-own-profile-reg">
                    <label htmlFor="dateOfBirth" className="form-label"> 
                        Your DateOfBirth:
                    </label>
                    <DatePicker
                        selected={dateOfBirth}
                        onChange={(date) => setDateOfBirth(date)}
                    />
                </div>
                <div>
                    <button
                        onClick={event => registerProfileClickHandler(event)}
                        className="btn btn-primary profile-reg-button"
                    >
                        Create profile
                    </button>
                </div>
            </form>
    );
}