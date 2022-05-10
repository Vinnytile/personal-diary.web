import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendData } from "../../helpers/WebSocketFunction";
import { MessageTypes } from "../../interfaces/enums";
import './RegisterFaceWebCamStyle.scss';

type RegisterFaceWebCamProps = {
    userId?: string
    msgData: React.MutableRefObject<string>
	regFace: React.MutableRefObject<boolean>
    updateIsClose(data: boolean): void
}

export const RegisterFaceWebCam: React.FC<RegisterFaceWebCamProps> = ({userId, regFace, msgData, updateIsClose}) => {
	const [disable, setDisable] = React.useState(true);
    const [intervalId, setIntervalId] = useState<number>(0)
	const [intervalId2, setIntervalId2] = useState<number>(0)
    const shouldSave = useRef<boolean>(false)

    const videoRef = useRef<any>(null)
    const photoRef = useRef<any>(null)
    const photo2Ref = useRef<any>(null)

    const navigate = useNavigate();

    useEffect(() => {
      getVideo();
    }, [videoRef]);

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
                UserId: userId,
                Type: MessageTypes.RegisterFace,
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

    const navigateToLoginSwitcher = () => {
        window.clearInterval(intervalId2)
      	window.clearInterval(intervalId)
      	updateIsClose(true)
        navigate('/loginSwitcher');
    }

    const setSave = () => {
    	shouldSave.current = true
    }

    return (
        <div className="general-component-regface">
            <video hidden onCanPlay={paintToCanvas} ref={videoRef} />
            <canvas hidden id="canvas" ref={photoRef} />
            <canvas id="canvas2" ref={photo2Ref} className="canvas-component-regface shadow" />
            <div>
                <button 
                    onClick={setSave} 
                    hidden={!disable} 
                    className="btn btn-primary regface-button"
                >
                    Start registration
                </button>
                <button 
                    onClick={navigateToLoginSwitcher} 
                    hidden={disable} 
                    className="btn btn-primary regface-button"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
