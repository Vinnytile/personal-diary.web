import { ISubscriptionDTO, IUserProfile } from "../interfaces/interfaces"
import Api from "./Api"

const getUserProfiles = async (): Promise<IUserProfile[]> => {
    const response = await Api.get(`userProfile`);

    return response.data;
};

const subscribeUser = async (subscription: ISubscriptionDTO) => {
    const response = await Api.post(`userProfile/subscribeUser`, subscription);

    return response.data;
}

const unsubscribeUser = async (subscription: ISubscriptionDTO) => {
    const response = await Api.post(`userProfile/unsubscribeUser`, subscription);

    return response.data;
}

const exportedObject = {
    getUserProfiles,
    subscribeUser,
    unsubscribeUser
};

export default exportedObject;