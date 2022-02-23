import Api from "./Api";
import { IUserLoginDTO } from '../interfaces/interfaces'
import LocalStorageApi from './LocalStorageApi'

const login = async (userLoginDTO: IUserLoginDTO, navigate: any) => {

    const response = await Api.post(`auth/login`, userLoginDTO)

    if (response.data.token !== null) {
        console.log(response.data)
        LocalStorageApi.setToken(response.data.token)
        
        navigate('/notes')
    }
}

const exportedObject = {
    login
};

export default exportedObject;