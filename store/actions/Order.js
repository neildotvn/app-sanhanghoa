import axios from "../../utils/Axios";
import { createAction } from "../../utils/ObjectUtils";
import * as actionTypes from "./ActionTypes";

export const createOrder = order => {
    return dispatch => {
        dispatch(createAction(actionTypes.ORDER_CREATE_START));
        axios
            .post("orders", order)
            .then(response => {
                console.log("CREATE ORDER SUCCESS!", response.data);
                dispatch(
                    createAction(actionTypes.ORDER_CREATE_SUCCESS, {
                        order: response.data
                    })
                );
            })
            .catch(error => {
                console.log("CREATE ORDER FAIL!", error);
                dispatch(
                    createAction(actionTypes.ORDER_CREATE_FAIL, { error })
                );
            })
            .finally(() =>
                dispatch(createAction(actionTypes.ORDER_CREATE_FINISH))
            );
    };
};
