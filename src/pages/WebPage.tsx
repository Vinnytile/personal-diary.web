import React, { useState, useRef, useEffect, useCallback } from "react";

const AppWs = () => {
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [data, setData] = useState<any>(null); 
    const [status, setStatus] = useState<string>("");
    const ws = useRef<any>(null);

    useEffect(() => {
        if (!isPaused) {
            ws.current = new WebSocket("wss://localhost:44301/ws"); // создаем ws соединение
            ws.current.onopen = () => {
                setStatus("Соединение открыто");	// callback на ивент открытия соединения 
            }
            ws.current.onclose = () => {
                setStatus("Соединение закрыто"); // callback на ивент закрытия соединения
            }

            gettingData();
        }

        return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
    }, [ws, isPaused]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e: any) => {                //подписка на получение данных по вебсокету
            if (isPaused) return;
            const message = JSON.parse(e.data);
            setData(message);
        };
    }, [isPaused]);

    return (
        <>
                <div>
                    <div>
                        <h2>{status}</h2>
                        <p>{`connection ID: ${data?.connectionID}`}</p>
                        <p>{`event: ${data?.event}`}</p>
                        <p>{`status: ${data?.status}`}</p>
                        <p>{`version: ${data?.version}`}</p>
                    </div>
                    <button onClick={() => {
                        ws.current.close();
                        setIsPaused(!isPaused)
                    }}>{!isPaused ? 'Остановить соединение' : 'Открыть соединение' }</button>
                </div>
        </>
    )
}

export default AppWs;