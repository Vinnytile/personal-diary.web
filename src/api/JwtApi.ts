import jwt_decode from "jwt-decode";
import LocalStorageApi from './LocalStorageApi'

const getUserIdFromJwt = (): string => {
    const token = LocalStorageApi.getToken() as string
    const decodedJwt = jwt_decode(token) as any

    return decodedJwt.id
}

const exportedObject = {
    getUserIdFromJwt
};

export default exportedObject;