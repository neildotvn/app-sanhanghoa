import axios from "axios";
import { AsyncStorage } from "react-native";
import * as storageKeys from "../store/storage/StorageKeys";

const instance = axios.create({
    baseURL: "http://192.168.1.3:3000/api/v1/",
    timeout: 5000
});

instance.interceptors.request.use(config => {
    // return config;
    return AsyncStorage.getItem(storageKeys.KEY_USER_TOKEN)
        .then(token => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        })
        .catch(err => {
            console.log(this, err);
            return Promise.reject(err);
        });
});

instance.interceptors.response.use(response => {
    return response;
});

export default instance;
