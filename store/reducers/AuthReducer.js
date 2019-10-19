import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    user: {
        user_uid: "",
        phone: "",
        full_name: "",
        token: "",
        account_uid: ""
    },
    updateSuccess: false,
    loading: false,
    error: null
};

export default authReducer = (state = initialState, action) => {
    // console.log("AUTH_REDUCER", action);
    switch (action.type) {
        case actionTypes.AUTH_START:
            return state;
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action.payload);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action.payload.error);
        case actionTypes.AUTH_UPDATE_START:
            return updateStart(state);
        case actionTypes.AUTH_UPDATE_SUCCESS:
            return updateSuccess(state, action.payload);
        case actionTypes.AUTH_UPDATE_FAIL:
            return updateFail(state, action.payload.error);
        case actionTypes.AUTH_UPDATE_FINISH:
            return updateFinished(state);
        default:
            return state;
    }
};

const authSuccess = (state, payload) => {
    console.log(actionTypes.AUTH_SUCCESS, updateObject(state, payload));
    return updateObject(state, payload);
};

const authFail = (state, error) => {
    console.log("From reducer", error);
    return updateObject(state, { loading: false, error });
};

const updateStart = state => {
    return updateObject(state, { loading: true });
};

const updateSuccess = (state, payload) => {
    console.log("UPDATE SUCCESS!", payload);
    return updateObject(state, {
        ...payload,
        updateSuccess: true,
        loading: false
    });
};

const updateFail = (state, error) => {
    return updateObject(state, { loading: false, updateSuccess: false, error });
};

const updateFinished = state => {
    return updateObject(state, { updateSuccess: false });
};
