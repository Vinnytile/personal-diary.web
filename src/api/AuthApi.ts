import Api from "./Api";
import { IUserLoginDTO, IUserRegisterDTO } from '../interfaces/interfaces'
import LocalStorageApi from './LocalStorageApi'

const login = async (userLoginDTO: IUserLoginDTO, navigate: any) => {

    const response = await Api.post(`auth/login`, userLoginDTO)

    if (response.data.token !== null) {
        LocalStorageApi.setToken(response.data.token)
        
        navigate('/notes')
    }
}

const register = async (userRegisterDTO: IUserRegisterDTO) => {
    const response = await Api.post(`auth/register`, userRegisterDTO)
}

const logout = () => {
    LocalStorageApi.removeToken()
    window.location.reload()
}

const exportedObject = {
    login,
    register,
    logout
};

export default exportedObject;