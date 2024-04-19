import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SubscribedtoData: []
}

const subscribedSlice = createSlice({
    name: "subscribedto",
    initialState,
    reducers: {
        setSubscribed: (state, action) => {
            state.SubscribedtoData = action.payload
        }
    }
})

export const {setSubscribed} = subscribedSlice.actions

export default subscribedSlice.reducer