import Api from "./Api";
import { IUserLoginDTO, IUserRegisterDTO } from '../interfaces/interfaces'
import LocalStorageApi from './LocalStorageApi'

const login = async (userLoginDTO: IUserLoginDTO) => {

    const response = await Api.post(`auth/login`, userLoginDTO)

    return response.data.userId
}

const register = async (userRegisterDTO: IUserRegisterDTO) => {
    const response = await Api.post(`auth/register`, userRegisterDTO)
    
    return response.data.userId
}

const registerFace = async (userId: string | undefined) => {
    const response = await Api.get(`auth/registerFace/${userId}`)
}

const generateJwtToken = async (userId: string | undefined) => {
    const response = await Api.get(`auth/jwtToken/${userId}`)
    LocalStorageApi.setToken(response.data)
}

const logout = () => {
    LocalStorageApi.removeToken()
    window.location.reload()
}

const exportedObject = {
    login,
    register,
    registerFace,
    generateJwtToken,
    logout
};

export default exportedObject;