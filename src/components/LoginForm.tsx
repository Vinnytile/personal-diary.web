import React, { useRef } from "react";

type LoginFormProps = {
    onAdd(email: string, password: string): void
}

export const LoginForm: React.FC<LoginFormProps> = ({onAdd}) => {
    const refEmail = useRef<HTMLInputElement>(null)
    const refPassword = useRef<HTMLInputElement>(null)

    const buttonClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        onAdd(refEmail.current!.value, refPassword.current!.value)

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
                Input Text
            </label>
            <button
                type="button"
                onClick={event => buttonClickHandler(event)}
            >
                Submit
            </button>
        </div>
    );
}