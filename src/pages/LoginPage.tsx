import React from "react";
import { LoginForm } from "../components/LoginForm";
import { IUserLoginDTO } from "../interfaces/interfaces"
import AuthApi from '../api/AuthApi'
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const loginHandler = async (email: string, password: string): Promise<void> => {
        const newUser: IUserLoginDTO = {
          email: email,
          password: password
        }

        await AuthApi.login(newUser, navigate)
    }

    return (
        <LoginForm onLogin={loginHandler} />
    );
}