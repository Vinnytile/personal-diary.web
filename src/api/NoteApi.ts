import axios from "axios";

export const getNotes = async () => {
    const response = await axios.get('https://localhost:44301/api/Notes');

    return response.data;
};

export default { 
    getNotes
}
