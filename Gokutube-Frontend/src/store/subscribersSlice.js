import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SubscribedtoData: []
}

const subscribersSlice = createSlice({
    name: "subscribers",
    initialState,
    reducers: {
        setSubscribers: (state, action) => {
            state.SubscribedtoData = action.payload
        }
    }
})

export const {setSubscribers} = subscribersSlice.actions

export default subscribersSlice.reducer