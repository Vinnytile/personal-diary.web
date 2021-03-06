import React, { useRef, useState } from "react";
import AuthApi from "../api/AuthApi";
import { LoginFaceWebCam } from "../components/LoginFaceWebCam/LoginFaceWebCam";
import { WebSocketFunction } from "../helpers/WebSocketFunction";
import { IUserLoginDTO } from "../interfaces/interfaces";

export const LoginFacePage: React.FC = () => {
    const msgDataRef = useRef<string>('')
    const regFaceRef = useRef<boolean>(false)
    const userIdRef = useRef<string>('')
    const [isClose, setIsClose] = useState<boolean>(false)
    
    const onUpdateMsgData = async (data: string, succeed: boolean) => {
        msgDataRef.current = data
        
        if (succeed && !regFaceRef.current) {
            regFaceRef.current = true
            await AuthApi.generateJwtToken(userIdRef.current)
        }
    }

    const onUpdateIsClose = (data: boolean) => {
        setIsClose(data)
    }

    const loginHandler = async (email: string) => {
        const newUser: IUserLoginDTO = {
          email: email,
          password: ""
        }

        const result = await AuthApi.loginFace(newUser)
        userIdRef.current = result

        return result
    }
    
    return (
        <>
            <WebSocketFunction isClose={isClose} updateMsgData={onUpdateMsgData}/>
            <LoginFaceWebCam regFace={regFaceRef} msgData={msgDataRef} updateIsClose={onUpdateIsClose} onLogin={loginHandler} />
        </>
    );
}