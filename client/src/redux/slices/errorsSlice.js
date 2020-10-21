// Redux
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'error',
    initialState: {
        formErrors: {},
    },
    reducers: {
        setFormErrors: (state, action) => {
            state.formErrors = action.payload;
        },
        resetFormErrors: (state) => {
            state.formErrors = {};
        },
    },
});

// Export Actions
export const { setFormErrors, resetFormErrors } = slice.actions;

// Selectors
export function selectFormErrors(state) {
    return state.error.formErrors;
}

export default slice.reducer;
