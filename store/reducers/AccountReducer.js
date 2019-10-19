import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    account: {
        account_uid: "",
        balance: 0,
        credit: 0,
        leverage: 0
    },
    loading: false,
    error: null
};

export default authReducer = (state = initialState, action) => {
    // console.log("ACCOUNT_REDUCER", action);
    switch (action.type) {
        case actionTypes.ACCOUNT_LOADING:
            return updateObject(state, { loading: true, error: null });
        case actionTypes.ACCOUNT_FETCH_SUCCESS:
            return fetchAccountSuccess(state, action.payload);
        case actionTypes.ACCOUNT_FETCH_FAIL:
            return fetchAccountFail(state, action.payload.error);
        default:
            return state;
    }
};

const fetchAccountSuccess = (state, payload) => {
    console.log(actionTypes.AUTH_SUCCESS, updateObject(state, payload));
    return updateObject(state, { loading: false, account: payload });
};

const fetchAccountFail = (state, error) => {
    console.log("From reducer", error);
    return updateObject(state, { loading: false, error });
};
