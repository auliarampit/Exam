/* eslint-disable prettier/prettier */
import * as actionTypes from './types';

const initialState = {
    randomCode: null,
    submitCode: null,
    submitImage: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RANDOM_CODE:
            return {
                ...state,
                randomCode: {
                    ...action.payload.randomCode,
                },
            };
            case actionTypes.SUBMIT_CODE:
            return {
                ...state,
                submitCode: {
                    ...action.payload.submitCode,
                },
            };
            case actionTypes.SUBMIT_IMAGE:
            return {
                ...state,
                submitImage: {
                    ...action.payload.submitImage,
                },
            };
            default:
                return state;
    }
};

export default reducer;
