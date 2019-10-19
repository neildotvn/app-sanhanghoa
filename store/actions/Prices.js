import axios from "../../utils/Axios";
import { createAction } from "../../utils/ObjectUtils";
import * as actionTypes from "./ActionTypes";

export default fetchAllPrices = () => {
    return dispatch => {
        dispatch(createAction(actionTypes.PRICES_FETCH_START));
        axios
            .get("prices")
            .then(response => {
                // console.log("PRICES_FETCH_SUCCESS!", response.data.result);
                dispatch(
                    createAction(actionTypes.PRICES_FETCH_SUCCESS, {
                        prices: response.data.result
                    })
                );
            })
            .catch(error => {
                console.log("PRICES_FETCH_FAIL!", error);
                dispatch(
                    createAction(actionTypes.PRICES_FETCH_FAIL, { error })
                );
            });
    };
};
