import axios from "../../utils/Axios";
import * as actionTypes from "./ActionTypes";
import { createAction } from "../../utils/ObjectUtils";

export const fetchAccountInfo = () => {
    return dispatch => {
        dispatch(createAction(actionTypes.ACCOUNT_LOADING));
        axios
            .get(`accounts`)
            .then(res => {
                dispatch(
                    createAction(actionTypes.ACCOUNT_FETCH_SUCCESS, res.data)
                );
            })
            .catch(error => {
                dispatch(
                    createAction(actionTypes.ACCOUNT_FETCH_FAIL, { error })
                );
            });
    };
};
