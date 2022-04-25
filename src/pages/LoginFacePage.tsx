import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import { LoginFaceWebCam } from "../components/LoginFaceWebCam";
import { WebSocketFunction } from "../helpers/WebSocketFunction";

export const LoginFacePage: React.FC = () => {
    const params = useParams();
    const msgDataRef = useRef<string>('')
    const regFaceRef = useRef<boolean>(false)
    const [isClose, setIsClose] = useState<boolean>(false)
    
    const onUpdateMsgData = async (data: string, succeed: boolean) => {
        msgDataRef.current = data
        
        if (succeed && !regFaceRef.current) {
            regFaceRef.current = true
            await AuthApi.generateJwtToken(params.userId)
        }
    }

    const onUpdateIsClose = (data: boolean) => {
        setIsClose(data)
    }
    
    return (
        <>
            <WebSocketFunction isClose={isClose} updateMsgData={onUpdateMsgData}/>
            <LoginFaceWebCam userId={params.userId} regFace={regFaceRef} msgData={msgDataRef} updateIsClose={onUpdateIsClose}/>
        </>
    );
}