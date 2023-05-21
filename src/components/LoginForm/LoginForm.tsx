import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './LoginFormStyle.scss';

type LoginFormProps = {
    onLogin(email: string, password: string): Promise<boolean>
}

export const LoginForm: React.FC<LoginFormProps> = ({onLogin}) => {
    const refEmail = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const loginClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        const result = await onLogin(refEmail.current!.value, refPassword.current!.value)

        if (result) {
            refEmail.current!.value = ''
            refPassword.current!.value = ''
            
            navigate('/generalNotes')
        }
    }

    return (
        <form className="w-25 mx-auto general-form-log shadow">
            <div className="form-group form-group-own-log">
                <label htmlFor="email" className="form-label"> 
                    Your Email
                </label>
                <input
                    ref={refEmail} 
                    type="text" 
                    id="email" 
                    placeholder="your_email@gmail.com"
                    className="form-control form-control-own-log"
                />
            </div>
            <div className="form-group form-group-own-log">
                <label htmlFor="password" className="form-label"> 
                    Your Password
                </label>
                <input
                    ref={refPassword}
                    type="text"
                    id="password"
                    placeholder="your password"
                    className="form-control form-control-own-log"
                />
            </div>
            <div>
                <button
                    onClick={event => loginClickHandler(event)}
                    className="btn btn-success log-button"
                >
                    Login User
                </button>
            </div>
        </form>
    );
}