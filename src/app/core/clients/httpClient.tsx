import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { apiUrl } from "../services/variables";

const BASEURL = apiUrl;

const httpClient = axios.create({
    baseURL: BASEURL,
});

httpClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const parsedPersistedAuth = JSON.parse(
        localStorage.getItem("persist:auth") || "{}"
    );
    const impersonateToken = JSON.parse(parsedPersistedAuth?.impersonateUser)
        ?.data?.access_token;
    const token = JSON.parse(parsedPersistedAuth?.login)?.data?.access_token;

    config.headers = {
        Authorization: token ? `Bearer ${impersonateToken ?? token}` : "",
    };

    config.signal = (new AbortController()).signal;

    return config;
});

httpClient.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response.data;
    },
    (error) => {
        throw error;
    }
);

export default httpClient;
