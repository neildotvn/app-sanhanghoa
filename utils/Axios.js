import axios from "axios";

const instance = axios.create({
    baseURL: "https://6b038df7.ngrok.io/api/v1/",
    timeout: 5000
});

instance.interceptors.request.use(request => {
    console.log("Sending request...", request);
    return request;
});

// instance.interceptors.response.use(response => {
//     // console.log("Response received!", response);
// });

export default instance;
