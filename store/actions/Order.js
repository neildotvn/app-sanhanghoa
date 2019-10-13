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

export const fetchAllActiveOrders = () => {
    return dispatch => {
        dispatch(createAction(actionTypes.ORDER_FETCH_ALL_ACTIVE_START));
        axios
            .get("orders/active")
            .then(response => {
                dispatch(
                    createAction(actionTypes.ORDER_FETCH_ALL_ACTIVE_SUCCESS, {
                        activeOrders: response.data
                    })
                );
            })
            .catch(error =>
                dispatch(
                    createAction(actionTypes.ORDER_FETCH_ALL_ACTIVE_FAIL, {
                        error
                    })
                )
            );
    };
};

export const fetchOrderHistory = () => {
    return dispatch => {
        dispatch(createAction(actionTypes.ORDER_FETCH_ALL_HISTORY_START));
        axios
            .get("orders/history")
            .then(response => {
                dispatch(
                    createAction(actionTypes.ORDER_FETCH_ALL_HISTORY_SUCCESS, {
                        orderHistory: response.data
                    })
                );
            })
            .catch(error =>
                dispatch(
                    createAction(actionTypes.ORDER_FETCH_ALL_HISTORY_FAIL, {
                        error
                    })
                )
            );
    };
};
