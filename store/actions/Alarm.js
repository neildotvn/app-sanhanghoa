import axios from "../../utils/Axios";
import { createAction } from "../../utils/ObjectUtils";
import * as actionTypes from "./ActionTypes";

export const fetchAlarms = () => {
    return dispatch => {
        dispatch(createAction(actionTypes.ALARM_FETCH_START));
        axios
            .get("alarms")
            .then(response => {
                dispatch(createAction(actionTypes.ALARM_FETCH_SUCCESS, { alarms: response.data }));
            })
            .catch(error => {
                dispatch(createAction(actionTypes.ALARM_FETCH_FAIL, { error }));
            })
            .finally(() => dispatch(createAction(actionTypes.ALARM_FETCH_FINISH)));
    };
};

export const createAlarm = alarm => {
    return dispatch => {
        dispatch(createAction(actionTypes.ALARM_CREATE_START));
        axios
            .post("alarms", alarm)
            .then(response => {
                console.log("ALARM_CREATE_SUCCESS!", response.data);
                dispatch(
                    createAction(actionTypes.ALARM_CREATE_SUCCESS, {
                        order: response.data
                    })
                );
            })
            .catch(error => {
                console.log("ALARM_CREATE_FAIL!", error);
                dispatch(createAction(actionTypes.ALARM_CREATE_FAIL, { error }));
            })
            .finally(() => dispatch(createAction(actionTypes.ALARM_CREATE_FINISH)));
    };
};

export const enableAlarm = alarm_uid => {
    axios
        .post(`alarms/${alarm_uid}/enable`)
        .then(() => console.log("Enabling alarm succeeded, yeah!"))
        .catch("Enabling alarm fails");
};

export const disableAlarm = alarm_uid => {
    axios
        .post(`alarms/${alarm_uid}/disable`)
        .then(() => console.log("Disabling alarm succeeded, yeah!"))
        .catch("Disabling alarm fails");
};

export const deleteAlarm = alarm_uid => {
    return dispatch => {
        dispatch(createAction(actionTypes.ALARM_DELETE_START));
        axios
            .post(`alarms/${alarm_uid}/delete`)
            .then(response => {
                console.log("ALARM_DELETE_SUCCESS!", response.data);
                dispatch(
                    createAction(actionTypes.ALARM_DELETE_SUCCESS, {
                        alarm_uid
                    })
                );
            })
            .catch(error => {
                console.log("ALARM_DELETE_FAIL!", error);
                dispatch(createAction(actionTypes.ALARM_DELETE_FAIL, { error }));
            })
            .finally(() => dispatch(createAction(actionTypes.ALARM_DELETE_FINISH)));
    };
};
