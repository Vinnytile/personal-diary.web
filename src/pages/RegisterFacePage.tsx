import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import { RegisterFaceWebCam } from "../components/RegisterFaceWebCam/RegisterFaceWebCam";
import { WebSocketFunction } from "../helpers/WebSocketFunction";

export const RegisterFacePage: React.FC = () => {
    const params = useParams();
    const msgDataRef = useRef<string>('')
    const regFaceRef = useRef<boolean>(false)
    const [isClose, setIsClose] = useState<boolean>(false)
    
    const onUpdateMsgData = async (data: string, succeed: boolean) => {
        msgDataRef.current = data
        
        if (succeed && !regFaceRef.current) {
            regFaceRef.current = true
            await AuthApi.registerFace(params.userId)
        }
    }

    const onUpdateIsClose = (data: boolean) => {
        setIsClose(data)
    }
 
    return (
        <>
            <WebSocketFunction isClose={isClose} updateMsgData={onUpdateMsgData}/>
            <RegisterFaceWebCam userId={params.userId} regFace={regFaceRef} msgData={msgDataRef} updateIsClose={onUpdateIsClose}/>
        </>
    );
}
