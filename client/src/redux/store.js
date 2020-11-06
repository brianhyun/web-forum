import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import errorsReducer from './slices/errorsSlice';
import forumAuthReducer from './slices/forumAuthSlice';
import forumReducer from './slices/forumSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        error: errorsReducer,
        forumAuth: forumAuthReducer,
        forum: forumReducer,
    },
});
