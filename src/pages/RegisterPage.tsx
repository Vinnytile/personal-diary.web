import React from "react";
import { IUserRegisterDTO } from "../interfaces/interfaces"
import AuthApi from '../api/AuthApi'
import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage: React.FC = () => {
    const registerHandler = async (email: string, password: string): Promise<void> => {
        const newUser: IUserRegisterDTO = {
          email: email,
          password: password
        }

        await AuthApi.register(newUser)
    }

    return (
        <RegisterForm onRegister={registerHandler} />
    );
}