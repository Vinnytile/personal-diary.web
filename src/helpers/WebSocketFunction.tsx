import React, { useEffect, useCallback, useRef } from "react";

type WebCamCanvasProps = {
    isClose: boolean
    updateMsgData(data: string, succeed: boolean): void
}

var ws: any;

export const WebSocketFunction: React.FC<WebCamCanvasProps> = ({isClose, updateMsgData}) => {
    ws = new WebSocket("wss://localhost:44301/ws")
    const connStatusRef = useRef<string>("");

    useEffect(() => {
        if (!isClose) {
            ws.onopen = () => {
                connStatusRef.current = "Websocket connection opened";	// callback на ивент открытия соединения
                console.log(connStatusRef.current);
            }
            ws.onclose = () => {
                connStatusRef.current = "Websocket connection closed"; // callback на ивент закрытия соединения
                console.log(connStatusRef.current);
            }
            gettingData();
        }

        return () => ws.close(); // кода меняется isPaused - соединение закрывается
    }, [ws, isClose]);


    const gettingData = useCallback(() => {
        if (!ws) return;

        ws.onmessage = (e: any) => { //подписка на получение данных по вебсокету
            if (isClose)
                return;
            //console.log("Websocket data receive")
            const message = JSON.parse(e.data);
            updateMsgData(message.Content, message.Succeed as boolean)
        };
    }, [isClose]);

    return <></>;
}

export const sendData = (data: any) => {
    ws.send(data)
    //console.log("Websocket data send")
}
