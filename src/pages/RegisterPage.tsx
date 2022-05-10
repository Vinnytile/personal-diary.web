import React, { useRef } from "react";
import { IUserRegisterDTO } from "../interfaces/interfaces"
import AuthApi from '../api/AuthApi'
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

export const RegisterPage: React.FC = () => {
    const userId = useRef<string>('')

    const registerHandler = async (email: string, username: string, password: string): Promise<void> => {
        const newUser: IUserRegisterDTO = {
          email: email,
          username: username,
          password: password
        }

        const result = await AuthApi.register(newUser)
        userId.current = result
    }

    return (
        <RegisterForm userId={userId} onRegister={registerHandler} />
    );
}