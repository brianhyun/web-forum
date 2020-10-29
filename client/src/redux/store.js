import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import errorsReducer from './slices/errorsSlice';
import forumAuthReducer from './slices/forumAuthSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        error: errorsReducer,
        forumAuth: forumAuthReducer,
    },
});
