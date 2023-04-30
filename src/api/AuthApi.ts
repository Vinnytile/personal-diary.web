import Api from "./Api";
import { IUserLoginDTO, IUserProfileDTO, IUserRegisterDTO } from '../interfaces/interfaces'
import LocalStorageApi from './LocalStorageApi'

const login = async (userLoginDTO: IUserLoginDTO) => {
    const response = await Api.post(`auth/login`, userLoginDTO)
    
    LocalStorageApi.setToken(response.data.token)
    
    return true
}

const loginFace = async (userLoginDTO: IUserLoginDTO) => {
    const response = await Api.post(`auth/loginFace`, userLoginDTO)

    return response.data.userId
}

const register = async (userRegisterDTO: IUserRegisterDTO) => {
    const response = await Api.post(`auth/register`, userRegisterDTO)
    
    return response.data.userId
}

const registerFace = async (userId: string | undefined) => {
    const response = await Api.get(`auth/registerFace/${userId}`)
}

const registerProfile = async (userProfileDTO: IUserProfileDTO) => {
    const response = await Api.post(`auth/registerProfile`, userProfileDTO)
    
    return response.data
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
    loginFace,
    register,
    registerFace,
    registerProfile,
    generateJwtToken,
    logout
};

export default exportedObject;