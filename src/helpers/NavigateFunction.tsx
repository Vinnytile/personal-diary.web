import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from '../api/Api'

export const NavigateFunction = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
        Api.setupResponseInterceptors(navigate)
    })

    return <></>;
}