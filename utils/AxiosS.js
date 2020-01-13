import axios from "axios";

const instance = axios.create({
    baseURL: "https://sanhanghoa24h.com/wp-json/wp/v2/",
    timeout: 10000
});

instance.interceptors.request.use(config => {
    // console.log(config)
    return config;
});

export default instance;
