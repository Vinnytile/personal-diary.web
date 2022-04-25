import React, { useRef } from "react";
import { LoginForm } from "../components/LoginForm";
import { IUserLoginDTO } from "../interfaces/interfaces"
import AuthApi from '../api/AuthApi'

export const LoginPage: React.FC = () => {
    const userId = useRef<string>('')

    const loginHandler = async (email: string, password: string): Promise<void> => {
        const newUser: IUserLoginDTO = {
          email: email,
          password: password
        }

        const result = await AuthApi.login(newUser)
        userId.current = result
    }

    return (
        <LoginForm userId={userId} onLogin={loginHandler} />
    );
}