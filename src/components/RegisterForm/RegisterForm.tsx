import React, { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterFormStyle.css';

type RegisterFormProps = {
    userId: MutableRefObject<string>
    onRegister(email: string, password: string): void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({userId, onRegister}) => {
    const [disable, setDisable] = React.useState(true);
    const refEmail = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)
    const navigate = useNavigate();

    const registerClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        await onRegister(refEmail.current!.value, refPassword.current!.value)

        refEmail.current!.value = ''
        refPassword.current!.value = ''
        
        if (userId.current)
        {
            setDisable(false)
        }
    }

    const registerFaceClickHandler = (event: React.MouseEvent) => {
        navigate(`/registerFace/${userId.current}`);
    }

    return (
            <form className="w-25 mx-auto general-form rounded">
                <div className="form-group form-group-own">
                    <label htmlFor="email" className="form-label"> 
                        Input Your Email
                    </label>
                    <input
                        ref={refEmail} 
                        type="text" 
                        id="email" 
                        placeholder="your_email@gmail.com"
                        className="form-control form-control-own"
                    />
                </div>
                <div className="form-group form-group-own">
                    <label htmlFor="password" className="form-label"> 
                        Input Your Password
                    </label>
                    <input
                        ref={refPassword}
                        type="text"
                        id="password"
                        placeholder="your password"
                        className="form-control form-control-own"
                    />
                </div>
                <div className="form-button-group">
                    <button
                        onClick={event => registerClickHandler(event)}
                        className="btn btn-success registration-button"
                    >
                        Register
                    </button>
                    <button 
                        onClick={event => registerFaceClickHandler(event)}
                        disabled={disable}
                        className="btn btn-warning registration-button"
                    >
                        Add faceId
                    </button>
                </div>
            </form>
    );
}