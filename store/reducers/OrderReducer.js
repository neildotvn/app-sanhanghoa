import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    orders: [
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
    loading: false,
    create_loading: false,
    create_success: false,
    error: null
};

export default orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_FETCH_ALL_START:
            return updateObject(state, { loading: true });
        case actionTypes.ORDER_FETCH_ALL_SUCCESS:
            return fetchAllOrdersSuccess(state, action.payload.orders);
        case actionTypes.ORDER_FETCH_ALL_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.payload.error
            });
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
            return updateObject(state, { create_success: false });
        default:
            return state;
    }
};

const fetchAllOrdersSuccess = (state, notifications) => {
    return updateObject(state, { notifications, loading: false });
};

const createOrderSuccess = (state, order) => {
    const copiedState = { ...state };
    copiedState.orders.unshift(order);
    copiedState.create_loading = false;
    copiedState.create_success = true;
    return copiedState;
};
