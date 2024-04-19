import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    videoData : [],
    length: 0
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setdata: (state, action) => {
            state.videoData = action.payload?.videos
            state.length = action.payload?.length
        },
        adddata: (state, action) => {
            console.log(action.payload);
            state.videoData = [action.payload , ...state.videoData]
            state.length = state.length + 1
        },
        deletedata: (state, action) => {
            state.videoData = state.videoData.filter(video => video._id !== action.payload)
            state.length = state.length - 1
        },
        updatedata: (state, action) => {
            state.videoData = state.videoData.map(video => video._id === action.payload._id ? action.payload : video)
        },
        clearvideos: (state) => {
            state.videoData = []
            state.length = 0
        }
    }
})

export const {setdata, adddata, deletedata, updatedata, clearvideos} = videoSlice.actions

export default videoSlice.reducer