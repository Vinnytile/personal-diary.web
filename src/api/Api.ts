import axios from "axios";
import LocalStorageApi from './LocalStorageApi'

const BASE_URL = "https://localhost:5001/api/";
const PYTHON_URL = "http://localhost:5003/"

axios.interceptors.request.use(
  config => {
    const token = LocalStorageApi.getToken()
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

const put = async (url: string, data?: any) => {
  const response = await axios.put(BASE_URL + url, data, {
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

const postPython = async (url: string, data?: any) => {
  const response = await axios.post(PYTHON_URL + url, data, {
    headers: {
      "Accept": "application/json",
      "Content-Type": 'application/json',
    },
  });

  return response;
};

const exportedObject = {
    get,
    post,
    put,
    remove,
    postPython,
    setupResponseInterceptors
};

export default exportedObject;