import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    notifications: [
        // {
        //     noti_uid: "",
        //     title: "",
        //     description: "",
        //     token: "",
        //     account_uid: ""
        // }
    ],
    loading: false,
    error: null
};

export default notiReducer = (state = initialState, action) => {
    // console.log("NOTI_REDUCER", action);
    switch (action.type) {
        case actionTypes.NOTIFICATION_LOADING:
            return updateObject(state, { loading: true });
        case actionTypes.NOTIFICATION_FETCH_ALL_SUCCESS:
            return fetchAllNotiSuccess(state, action.payload.notifications);
        case actionTypes.NOTIFICATION_FETCH_ALL_FAIL:
            return fetchAllNotiFail(state, action.payload.error);
        default:
            return state;
    }
};

const fetchAllNotiSuccess = (state, notifications) => {
    return updateObject(state, { notifications, loading: false });
};

const fetchAllNotiFail = (state, error) => {
    return updateObject(state, { loading: false, error });
};
