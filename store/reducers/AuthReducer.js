import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    user: {
        user_uid: "",
        phone: "",
        name: "",
        token: "",
        account_uid: ""
    },
    error: null
};

export default authReducer = (state = initialState, action) => {
    console.log("action", action);
    switch (action.type) {
        case actionTypes.AUTH_START:
            return state;
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action.payload);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action.payload.error);
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
