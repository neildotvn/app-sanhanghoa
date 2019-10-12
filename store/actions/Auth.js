import axios from "../../utils/Axios";
import * as actionTypes from "./ActionTypes";
import { createAction } from "../../utils/ObjectUtils";
import { AsyncStorage } from "react-native";
import * as storeageKeys from "../storage/StorageKeys";

export const verify = () => {
    return dispatch => {
        dispatch({ type: actionTypes.AUTH_START });
        axios
            .get("users/me")
            .then(res => {
                console.log(this, res.data);
                dispatch(
                    createAction(actionTypes.AUTH_SUCCESS, { user: res.data })
                );
            })
            .catch(err =>
                dispatch(
                    createAction(actionTypes.AUTH_FAIL, { error: err.response })
                )
            );
    };
};

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

export const updateProfile = user => {
    return dispatch => {
        dispatch(createAction(actionTypes.AUTH_UPDATE_START));
        axios
            .put("users/me", user)
            .then(response => {
                console.log(response.data);
                dispatch(
                    createAction(actionTypes.AUTH_UPDATE_SUCCESS, {
                        user: response.data
                    })
                );
            })
            .catch(error => {
                console.log(error);
                dispatch(createAction(actionTypes.AUTH_UPDATE_FAIL, { error }));
            })
            .finally(() =>
                dispatch(createAction(actionTypes.AUTH_UPDATE_FINISH))
            );
    };
};

const saveToken = token => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(storeageKeys.KEY_USER_TOKEN, token).then(
            () => resolve(),
            err => reject(err)
        );
    });
};
