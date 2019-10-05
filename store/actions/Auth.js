import axios from "../../utils/Axios";
import * as actionTypes from "./ActionTypes";
import { createAction } from "../../utils/ObjectUtils";
import { AsyncStorage } from "react-native";
import * as storeageKeys from "../storage/StorageKeys";

export const register = (dispatch, payload) => {
    dispatch(createAction(actionTypes.LOADING_ON));
    dispatch(createAction(actionTypes.AUTH_START));
    axios
        .post("register", payload)
        .then(response => {
            console.log(this, response.data);
            dispatch(
                createAction(actionTypes.AUTH_SUCCESS, { user: response.data })
            );
        })
        .catch(err => {
            dispatch(
                createAction(actionTypes.AUTH_FAIL, { error: err.response })
            );
            console.log(err);
        })
        .finally(() => dispatch(createAction(actionTypes.LOADING_OFF)));
};

export const login = (dispatch, payload) => {
    dispatch(createAction(actionTypes.LOADING_ON));
    dispatch(createAction(actionTypes.AUTH_START));
    axios
        .post("login", payload)
        .then(response => {
            console.log("Login Success!", response.data);
            saveToken(response.data.token)
                .then(() => {
                    dispatch(
                        createAction(actionTypes.AUTH_SUCCESS, {
                            user: response.data
                        })
                    );
                })
                .catch(err => {
                    console.log(err);
                    dispatch(
                        createAction(actionTypes.AUTH_FAIL, { error: err })
                    );
                });
        })
        .catch(err => {
            dispatch(
                createAction(actionTypes.AUTH_FAIL, { error: err.response })
            );
            console.log(err);
        })
        .finally(() => dispatch(createAction(actionTypes.LOADING_OFF)));
};

const saveToken = token => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(storeageKeys.KEY_USER_TOKEN, token).then(
            () => resolve(),
            err => reject(err)
        );
    });
};
