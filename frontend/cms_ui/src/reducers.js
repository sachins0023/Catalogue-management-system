import { combineReducers } from 'redux';

const INITIAL_STATE = {
    product: null
};

const catalogReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'PRODUCT_SELECTED':
            return { ...state, product: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    catalog: catalogReducer
});