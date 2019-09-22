import axios from "axios";
import * as actionTypes from "./ActionTypes";
import { createAction } from "../../utils/ObjectUtils";

export const login = dispatch => {
    dispatch(createAction(actionTypes.AUTH_START));
    axios
        .get("http://www.mocky.io/v2/5d877380340000215c0a1506")
        .then(data => {
            dispatch({
                type: actionTypes.AUTH_SUCCESS,
                payload: {
                    userInfo: data.data
                }
            });
        })
        .catch(err => {
            dispatch(createAction(actionTypes.AUTH_FAIL));
            console.error(err);
        });
};
