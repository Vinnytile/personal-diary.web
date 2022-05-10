import React from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { IUserLoginDTO } from "../interfaces/interfaces"
import AuthApi from '../api/AuthApi'

export const LoginPage: React.FC = () => {
    const loginHandler = async (email: string, password: string): Promise<boolean> => {
        const newUser: IUserLoginDTO = {
          email: email,
          password: password
        }

        const result = await AuthApi.login(newUser)
        return result
    }

    return (
        <LoginForm onLogin={loginHandler} />
    );
}