import { REHYDRATE } from 'redux-persist';

import {
    CREATE_TEST
} from 'store/actions/common';

const initialState = {
    testValue: ''
};

const common = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            const rehydrated =
                (action?.payload?.common) || {};

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

export default common;