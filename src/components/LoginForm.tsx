import React, { useRef } from "react";

type LoginFormProps = {
    onLogin(email: string, password: string): void
}

export const LoginForm: React.FC<LoginFormProps> = ({onLogin}) => {
    const refEmail = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)

    const loginClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        onLogin(refEmail.current!.value, refPassword.current!.value)

        refEmail.current!.value = ''
        refPassword.current!.value = ''
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
                Login
            </button>
        </div>
    );
}