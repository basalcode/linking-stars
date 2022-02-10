/* packages */
import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

/* store */
import rootReducer from 'store/reducers';
import rootSaga from 'store/sagas';

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, reduxLogger)));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
