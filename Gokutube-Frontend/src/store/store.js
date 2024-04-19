import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'
import videoReducer from './videoSlice';
import commentReducer from './commentSlice';
import playlistReducer from './playlistSlice'
import subscribedSlice from './subscribedSlice'
import subscribersSlice from './subscribersSlice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    authReducer,
    videoReducer,
    commentReducer,
    playlistReducer,
    subscribedSlice,
    subscribersSlice,
    
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
    // reducer: {
    //     authReducer,
    //     videoReducer,
    //     commentReducer
    // }
})


export default store