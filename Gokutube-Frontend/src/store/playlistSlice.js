import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    PlaylistData: {},
}

const PlaylistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setplaylist: (state, action) => {
            state.PlaylistData = action.payload
        }
    }
})

export const {setplaylist} = PlaylistSlice.actions

export default PlaylistSlice.reducer