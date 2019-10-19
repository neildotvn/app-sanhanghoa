import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    prices: [],
    loading: false,
    error: null
};

const fuck = {
    prices: [
        {
            c: "VND",
            id: "39cf70bf-cd01-4092-ae37-bb29850f900b",
            vs: [
                23205,
                23200,
                -5,
                -0.02,
                0,
                "+",
                23205,
                23205,
                23205,
                23205,
                0,
                23200,
                0,
                23290,
                0,
                "09:00:12 PM",
                "10/18/2019"
            ]
        }
    ]
};

export default priceReducer = (state = initialState, action) => {
    // console.log("PRICE REDUCER", action.payload);
    switch (action.type) {
        case actionTypes.PRICES_FETCH_START:
            return updateObject(state, { loading: true });
        case actionTypes.PRICES_FETCH_SUCCESS:
            return updateObject(state, {
                prices: action.payload.prices,
                loading: false
            });
        case actionTypes.PRICES_FETCH_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.payload.error
            });
        default:
            return state;
    }
};
