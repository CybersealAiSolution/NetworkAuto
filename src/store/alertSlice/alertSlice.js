import { createSlice } from "@reduxjs/toolkit";

export const alertDetail = createSlice({
    name: 'alertDetail',
    initialState: {
        alertMsg: '',
        alertStatus: '',
        alertVisibility: false
    },
    reducers: {
        setAlert: (state, action) => {
            state.alertMsg = action.payload.msg;
            state.alertStatus = action.payload.status;
            state.alertVisibility = true;
        },
        clearAlert: (state) => {
            state.alertMsg = '';
            state.alertStatus = '';
            state.alertVisibility = false;
        }
    },
});

// Export actions
export const { setAlert, clearAlert } = alertDetail.actions;

// Export reducer
export default alertDetail.reducer;
