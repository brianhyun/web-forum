import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import errorsReducer from './slices/errorsSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        error: errorsReducer,
    },
});
