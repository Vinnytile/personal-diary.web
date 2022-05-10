import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendData } from "../../helpers/WebSocketFunction";
import { MessageTypes } from "../../interfaces/enums";
import './LoginFaceWebCamStyle.scss';

type LoginFaceWebCamProps = {
    msgData: React.MutableRefObject<string>
	regFace: React.MutableRefObject<boolean>
    updateIsClose(data: boolean): void
    onLogin(email: string): any
}

export const LoginFaceWebCam: React.FC<LoginFaceWebCamProps> = ({regFace, msgData, updateIsClose, onLogin}) => {
    const [disable, setDisable] = React.useState(true);
    const [intervalId, setIntervalId] = useState<number>(0)
	const [intervalId2, setIntervalId2] = useState<number>(0)
    const userIdRef = useRef<string>('')
    const shouldSave = useRef<boolean>(false)
    const refEmail = useRef<HTMLInputElement>(null)

    const videoRef = useRef<any>(null)
    const photoRef = useRef<any>(null)
    const photo2Ref = useRef<any>(null)

    const navigate = useNavigate();

    useEffect(() => {
      //getVideo();
    }, [userIdRef]);

    const getVideo = () => {
        navigator.mediaDevices
          .getUserMedia({ video: { width: 720 } })
          .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
          })
          .catch(err => {
            console.error("error:", err);
        });
    };

    const paintToCanvas = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");
    
        const width = 480;
        const height = 360;
        photo.width = width;
        photo.height = height;

        let photo2 = photo2Ref.current;
        let ctx2 = photo2.getContext("2d");

        photo2.width = width;
        photo2.height = height;

        const intervalId = window.setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
            var canvas = document.getElementById('canvas') as HTMLCanvasElement;
            var dataURL = canvas.toDataURL('image/jpeg', 0.7);
            var dataToSend = {
                UserId: userIdRef.current,
                Type: MessageTypes.LoginFace,
                Content: dataURL,
                ShouldSave: shouldSave.current
            }
            var message = JSON.stringify(dataToSend)
  
            sendData(message);
			if (regFace.current)
			{
				setDisable(false)
			}
        }, 100)
        setIntervalId(intervalId)
        
		var image = new Image();
		const intervalId2 = window.setInterval(() => {
			var imageSrc = 'data:image/jpeg;base64,' + msgData.current
			image.onload = function() {
			  ctx2.drawImage(image, 0, 0);
			};
			image.src = imageSrc
		}, 100)
		setIntervalId2(intervalId2)
    }

    const closeConnection = () => {
	  	window.clearInterval(intervalId2)
      	window.clearInterval(intervalId)
      	updateIsClose(true)
      	navigate('/notes');
    }

    const setSave = () => {
    	shouldSave.current = true
    }

    const loginClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault()
        
        const result = await onLogin(refEmail.current!.value)
        userIdRef.current = result

        getVideo();
        shouldSave.current = true
    }

    return (
        <div className="general-component-logface">
            <div className="logface-form">
                <div className="form-group form-group-own-log">
                    <label htmlFor="email" className="form-label"> 
                        Your Email
                    </label>
                    <input
                        ref={refEmail} 
                        type="text" 
                        id="email" 
                        placeholder="your_email@gmail.com"
                        className="form-control form-control-own-logface"
                    />
                </div>
                <div>
                    <button 
                        onClick={event => loginClickHandler(event)}
                        className="btn btn-success logface-button"
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="logface-canvas">
                    <video hidden onCanPlay={paintToCanvas} ref={videoRef} />
                    <canvas hidden id="canvas" ref={photoRef} />
                <canvas id="canvas2" ref={photo2Ref} className="canvas-component-logface"/>
                <div>
                    <button 
                        onClick={setSave}
                        hidden={!disable || userIdRef.current === ''}
                        className="btn btn-success logface-button"
                    >
                        Start login
                    </button>
                    <button 
                        onClick={closeConnection} 
                        hidden={disable}
                        className="btn btn-success logface-button"
                    >
                        Go to notes
                    </button>
                </div>
            </div>
        </div>
    );
}
