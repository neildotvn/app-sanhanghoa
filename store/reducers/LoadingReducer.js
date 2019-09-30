import * as actionTypes from "../actions/ActionTypes";

const initialState = {
    loading: false
};

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_ON:
            return onLoading(true);
        case actionTypes.LOADING_OFF:
            return onLoading(false);
        default:
            return state;
    }
};

const onLoading = isLoading => {
    console.log(`isLoading = ${isLoading}`);
    return { loading: isLoading };
};
