import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    activeOrders: [
        // order_uid UUID NOT NULL PRIMARY KEY,
        // exchange CHAR(3) NOT NULL,
        // order_type INT NOT NULL, /* 0 for buy, 1 for sell, 2 for buy limit, 3 for sell limit, 4 for buy stop, 5 for sell stop */
        // order_status INT NOT NULL, /* 0 for active, 1 for inactive */
        // volume FLOAT8 NOT NULL,
        // created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(2),
        // closed_at TIMESTAMPTZ,
        // placing_price FLOAT8 NOT NULL,
        // take_profit_price FLOAT8,
        // stop_loss_price FLOAT8,
        // closing_price FLOAT8,
        // result BIGINT,
        // account_uid UUID REFERENCES account(account_uid) NOT NULL
    ],
    orderHistory: [],
    active_loading: false,
    history_loading: false,
    create_loading: false,
    create_success: false,
    close_loading: false,
    close_success: false,
    fetch_error: null,
    error: null
};

export default orderReducer = (state = initialState, action) => {
    // console.log("ORDER REDUCER", action.type, action.payload);
    switch (action.type) {
        case actionTypes.ORDER_FETCH_ALL_ACTIVE_START:
            return updateObject(state, { active_loading: true });
        case actionTypes.ORDER_FETCH_ALL_ACTIVE_SUCCESS:
            return fetchActiveOrdersSuccess(state, action.payload.activeOrders);
        case actionTypes.ORDER_FETCH_ALL_ACTIVE_FAIL:
            return updateObject(state, {
                active_loading: false,
                fetch_error: action.payload.error
            });
        case actionTypes.ORDER_FETCH_ALL_ACTIVE_FINISH:
            return updateObject(state, { fetch_error: null });
        case actionTypes.ORDER_FETCH_ALL_HISTORY_START:
            return updateObject(state, { history_loading: true });
        case actionTypes.ORDER_FETCH_ALL_HISTORY_SUCCESS:
            return fetchOrderHistorySucess(state, action.payload.orderHistory);
        case actionTypes.ORDER_FETCH_ALL_HISTORY_FAIL:
            return updateObject(state, {
                history_loading: false,
                fetch_error: action.payload.error
            });
        case actionTypes.ORDER_FETCH_ALL_HISTORY_FINISH:
            return updateObject(state, { fetch_error: null });
        case actionTypes.ORDER_CREATE_START:
            return updateObject(state, { create_loading: true });
        case actionTypes.ORDER_CREATE_SUCCESS:
            return createOrderSuccess(state, action.payload.order);
        case actionTypes.ORDER_CREATE_FAIL:
            return updateObject(state, {
                create_loading: false,
                error: action.payload.error
            });
        case actionTypes.ORDER_CREATE_FINISH:
            return updateObject(state, { create_success: false, error: null });
        case actionTypes.ORDER_CLOSE_START:
            return updateObject(state, { close_loading: true });
        case actionTypes.ORDER_CLOSE_SUCCESS:
            return updateObject(state, {
                close_loading: false,
                close_success: true
            });
        case actionTypes.ORDER_CLOSE_FAIL:
            return updateObject(state, {
                close_loading: false,
                error: action.payload.error
            });
        case actionTypes.ORDER_CLOSE_FINISH:
            return updateObject(state, { close_success: false, error: null });
        default:
            return state;
    }
};

const fetchActiveOrdersSuccess = (state, activeOrders) => {
    return updateObject(state, { activeOrders, active_loading: false });
};

const fetchOrderHistorySucess = (state, orderHistory) => {
    return updateObject(state, { orderHistory, history_loading: false });
};

const createOrderSuccess = (state, order) => {
    const copiedState = { ...state };
    copiedState.activeOrders.unshift(order);
    copiedState.create_loading = false;
    copiedState.create_success = true;
    return copiedState;
};
