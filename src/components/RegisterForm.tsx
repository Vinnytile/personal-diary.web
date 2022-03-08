import React, { useRef } from "react";

type RegisterFormProps = {
    onRegister(email: string, password: string): void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({onRegister}) => {
    const refEmail = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)

    const registerClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        onRegister(refEmail.current!.value, refPassword.current!.value)

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
                onClick={event => registerClickHandler(event)}
            >
                Register
            </button>
        </div>
    );
}