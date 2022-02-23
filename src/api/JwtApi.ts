import jwt_decode from "jwt-decode";

const getUserIdFromJwt = (): string => {
    const token = localStorage.getItem('token') as string
    const decodedJwt = jwt_decode(token) as any

    return decodedJwt.id
}

const exportedObject = {
    getUserIdFromJwt
};

export default exportedObject;