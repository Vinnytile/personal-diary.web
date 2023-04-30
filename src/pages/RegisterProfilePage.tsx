import React from "react";
import { IUserProfileDTO } from "../interfaces/interfaces";
import { RegisterProfileForm } from "../components/RegisterProfileForm/RegisterProfileForm";
import { useParams } from "react-router-dom";
import AuthApi from "../api/AuthApi";

export const RegisterProfilePage: React.FC = () => {
    const params = useParams();

    const registerProfileHandler = async (username: string, firstname: string, lastname: string,
        age: number, dateOfBirth: Date): Promise<void> => {
        const newUserProfile: IUserProfileDTO = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            age: age,
            dateOfBirth: dateOfBirth,
            userIdentityFID: params.userIdentityId
        }

        await AuthApi.registerProfile(newUserProfile)
    }

    return (
        <RegisterProfileForm onRegister={registerProfileHandler} />
    );
}