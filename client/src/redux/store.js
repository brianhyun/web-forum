import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

import authReducer from './slices/authSlice';
import errorsReducer from './slices/errorsSlice';
import forumAuthReducer from './slices/forumAuthSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorsReducer,
    forumAuth: forumAuthReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;
