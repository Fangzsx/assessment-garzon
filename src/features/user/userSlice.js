import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name : 'user',
    initialState : {
        value : {}
    },
    reducers : {
        setSession : (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setSession } = userSlice.actions;
export default userSlice.reducer;
