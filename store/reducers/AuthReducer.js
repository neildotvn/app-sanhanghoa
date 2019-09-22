import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    userInfo: {
        user_uid: "",
        phone: "",
        name: ""
    }
};

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            console.log(action);
            return authSuccess(state, action.userInfo);
        default:
            return initialState;
    }
};

const authSuccess = (state, userInfo) => {
    return updateObject(state, userInfo);
};
