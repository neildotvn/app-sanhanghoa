import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    alarms: [
        // alarm_uid UUID NOT NULL PRIMARY KEY,
        // exchange VARCHAR(10),
        // alarm_type INT NOT NULL, -- 0 for up, 1 for down
        // price FLOAT8 NOT NULL,
        // description VARCHAR(70),
        // created_at TIMESTAMPTZ NOT NULL,
        // status INT NOT NULL DEFAULT 0, -- 0 is active, 1 is inactive
        // user_uid UUID REFERENCES users(user_uid)
    ],
    fetch_loading: false,
    fetch_success: false,
    create_loading: false,
    create_success: false,
    delete_loading: false,
    delete_success: false,
    fetch_error: null,
    create_error: null,
    delete_error: null
};

export default orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALARM_FETCH_START:
            return updateObject(state, { fetch_loading: true });
        case actionTypes.ALARM_FETCH_SUCCESS:
            return updateObject(state, { alarms: action.payload.alarms });
        case actionTypes.ALARM_FETCH_FAIL:
            return updateObject(state, { fetch_error: action.payload.error });
        case actionTypes.ALARM_FETCH_FINISH:
            return updateObject(state, { fetch_error: null, fetch_loading: false, fetch_success: false });
        case actionTypes.ALARM_CREATE_START:
            return updateObject(state, { create_loading: true });
        case actionTypes.ALARM_CREATE_SUCCESS:
            return updateObject(state, { create_success: true });
        case actionTypes.ALARM_CREATE_FAIL:
            return updateObject(state, { create_error: action.payload.error });
        case actionTypes.ALARM_CREATE_FINISH:
            return updateObject(state, { create_error: null, create_loading: false, create_success: false });
        case actionTypes.ALARM_DELETE_START:
            return updateObject(state, { delete_loading: true });
        case actionTypes.ALARM_DELETE_SUCCESS:
            return deleteSuccess(state, action);
        case actionTypes.ALARM_DELETE_FAIL:
            return updateObject(state, { delete_error: action.payload.error });
        case actionTypes.ALARM_DELETE_FINISH:
            return updateObject(state, { delete_error: null, delete_loading: false, delete_success: false });
        default:
            return state;
    }
};

const deleteSuccess = (state, action) => {
    alarms = state.alarms.filter(alarm => alarm.alarm_uid !== action.payload.alarm_uid);
    return updateObject(state, { alarms, delete_success: true });
};
