import * as actionTypes from "../actions/ActionTypes";
import { updateObject } from "../../utils/ObjectUtils";

const initialState = {
    prices: {},
    loading: false,
    error: null
};

export default priceReducer = (state = initialState, action) => {
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
