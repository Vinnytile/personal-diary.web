const STORAGE_KEY: string = "token";

const getToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEY);
}

const setToken = (token: string): void => {
    localStorage.setItem(STORAGE_KEY, token);
}

const removeToken= (): void => {
    localStorage.removeItem(STORAGE_KEY);
}

const exportedObject = {
    getToken,
    setToken,
    removeToken
};

export default exportedObject;