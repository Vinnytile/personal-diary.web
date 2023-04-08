import { IUserProfileDTO } from "../interfaces/interfaces"
import Api from "./Api"

const registerProfile = async (userProfileDTO: IUserProfileDTO) => {
    const response = await Api.post(`userProfile/registerProfile`, userProfileDTO)
    
    return response.data
}

const exportedObject = {
    registerProfile
};

export default exportedObject;