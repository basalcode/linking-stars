import { REHYDRATE } from 'redux-persist';

import {
    CREATE_TEST
} from 'store/actions/common';

const initialState = {
    testValue: ''
};

const commerce = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            const rehydrated =
                (action && action.payload && action.payload.commerce) || {};

            return {
                ...state,
                ...rehydrated,
            };
        }

        case CREATE_TEST: {
            return {
                ...state,
                testValue: action.payload.testValue
            }
        }
    }
}