import varNames from "../constants/VariableNames";

export default instance = () => {
    const token = `Bearer ${window.localStorage.getItem(varNames.token)}`;

    axios.create({
        baseURL: "",
        timeout: 5000,
        headers: { Authorization: token }
    });
};
