import React, { useEffect, useCallback, useRef } from "react";

type WebCamCanvasProps = {
    isClose: boolean
    updateMsgData(data: string, succeed: boolean): void
}

var ws: any

export const WebSocketFunction: React.FC<WebCamCanvasProps> = ({isClose, updateMsgData}) => {
    ws = new WebSocket("wss://localhost:5001/ws")
    
    const connStatusRef = useRef<string>("");

    useEffect(() => {
        if (!isClose) {
            ws.onopen = () => {
                connStatusRef.current = "Websocket connection opened";
                console.log(connStatusRef.current);
            }
            ws.onclose = () => {
                connStatusRef.current = "Websocket connection closed";
                console.log(connStatusRef.current);
            }
            gettingData();
        }

        return () => {
            ws.close();
        }
    }, [ws, isClose]);


    const gettingData = useCallback(() => {
        if (!ws) return;

        ws.onmessage = (e: any) => {
            if (isClose) {
                return;
            }

            const message = JSON.parse(e.data);
            console.log(message.Succeed)
            updateMsgData(message.Content, message.Succeed as boolean) 
        };
    }, [isClose]);

    return <></>;
}

export const sendData = (data: any) => {
    ws.send(data)
    //console.log("Websocket data send")
}
