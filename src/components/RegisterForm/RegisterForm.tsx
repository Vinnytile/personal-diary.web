import React, { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterFormStyle.scss';

type RegisterFormProps = {
    userId: MutableRefObject<string>
    onRegister(email: string, username: string, password: string): void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({userId, onRegister}) => {
    const [disable, setDisable] = React.useState(true);
    const refEmail = useRef<HTMLInputElement>(null)
    const refUsername = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const registerClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        await onRegister(refEmail.current!.value, refUsername.current!.value, refPassword.current!.value)
        
        if (userId.current)
        {
            setDisable(false)
        }
    }

    const registerFaceClickHandler = (event: React.MouseEvent) => {
        refEmail.current!.value = ''
        refUsername.current!.value = ''
        refPassword.current!.value = ''

        navigate(`/registerFace/${userId.current}`);
    }

    return (
            <form className="w-25 mx-auto general-form-reg shadow">
                <div className="form-group form-group-own-reg">
                    <label htmlFor="email" className="form-label"> 
                        Your Email:
                    </label>
                    <input
                        ref={refEmail} 
                        type="text" 
                        id="email" 
                        placeholder="your_email@gmail.com"
                        className="form-control form-control-own-reg"
                    />
                </div>
                <div className="form-group form-group-own-reg">
                    <label htmlFor="username" className="form-label"> 
                        Your Username:
                    </label>
                    <input
                        ref={refUsername} 
                        type="text" 
                        id="username" 
                        placeholder="your_username"
                        className="form-control form-control-own-reg"
                    />
                </div>
                <div className="form-group form-group-own-reg">
                    <label htmlFor="password" className="form-label"> 
                        Your Password:
                    </label>
                    <input
                        ref={refPassword}
                        type="text"
                        id="password"
                        placeholder="your password"
                        className="form-control form-control-own-reg"
                    />
                </div>
                <div>
                    <button
                        onClick={event => registerClickHandler(event)}
                        hidden={!disable}
                        className="btn btn-primary reg-button"
                    >
                        Register
                    </button>
                    <button 
                        onClick={event => registerFaceClickHandler(event)}
                        hidden={disable}
                        className="btn btn-primary reg-button"
                    >
                        Add faceId
                    </button>
                </div>
            </form>
    );
}