import axios from "../../utils/Axios";
import * as actionTypes from "./ActionTypes";
import { createAction } from "../../utils/ObjectUtils";

export const fetAllNotis = () => {
    return dispatch => {
        dispatch(createAction(actionTypes.NOTIFICATION_LOADING));
        axios
            .get("notifications")
            .then(res => {
                dispatch({
                    type: actionTypes.NOTIFICATION_FETCH_ALL_SUCCESS,
                    payload: {
                        notifications: res.data
                    }
                });
            })
            .catch(error => {
                dispatch(
                    createAction(actionTypes.NOTIFICATION_FETCH_ALL_FAIL, {
                        error
                    })
                );
            });
    };
};
