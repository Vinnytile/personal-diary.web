import axios from "axios";

const BASE_URL = "https://localhost:44301/api/";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

const setupResponseInterceptors = (navigate: any) => {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/login');
        }
      }
      
      return Promise.reject(error);
    }
  );
};

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

const exportedObject = {
    get,
    post,
    remove,
    setupResponseInterceptors
};

export default exportedObject;