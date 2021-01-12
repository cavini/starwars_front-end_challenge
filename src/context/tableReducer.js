

import { GET_DATA, GET_FILTERED_DATA } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case GET_FILTERED_DATA:
            return {
                ...state,
                filteredData: action.payload
            }
        default:
            return state;
    }
}
