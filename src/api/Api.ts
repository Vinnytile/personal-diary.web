import axios from "axios";

const BASE_URL = "https://localhost:44301/api/";

const get = async (url: string, data?: any) => {
    const response = await axios.get(BASE_URL + url, {
      params: data
    });

    return response;
};

const post = async (url: string, data?: any) => {
    const response = await axios.post(BASE_URL + url, data, {
      headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',
      },
    });

    return response;
  };

const remove = async (url: string) => {
    const response = await axios.delete(BASE_URL + url);

    return response;
};

axios.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 400) {
            console.log('error')
            console.log(err.response?.errors)
        }
    }    
);

const exportedObject = {
    get,
    post,
    remove
};

export default exportedObject;