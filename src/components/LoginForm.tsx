import React, { MutableRefObject, useRef } from "react";
import { Link } from "react-router-dom";

type LoginFormProps = {
    userId: MutableRefObject<string>
    onLogin(email: string, password: string): void
}

export const LoginForm: React.FC<LoginFormProps> = ({userId, onLogin}) => {
    const [disable, setDisable] = React.useState(true);
    const refEmail = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)

    const loginClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        await onLogin(refEmail.current!.value, refPassword.current!.value)

        refEmail.current!.value = ''
        refPassword.current!.value = ''

        if (userId.current)
        {
            setDisable(false)
        }
    }

    return (
        <div>
            <input
                ref={refEmail} 
                type="text" 
                id="email" 
                placeholder="Input"
            />
            <label htmlFor="email"> 
                Input Email
            </label>
            <input
                ref={refPassword}
                type="text"
                id="password"
                placeholder="Input"
            />
            <label htmlFor="password"> 
                Input Password
            </label>
            <button
                type="button"
                onClick={event => loginClickHandler(event)}
            >
                Login User
            </button>
            <Link to={`/loginFace/${userId.current}`} >
                <button 
                    disabled={disable}
                >
                    Login Face
                </button>
            </Link>
        </div>
    );
}