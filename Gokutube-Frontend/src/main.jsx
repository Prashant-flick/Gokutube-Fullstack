import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import store from "./store/store.js"
import {Provider} from "react-redux"
import {
  Home,
  AuthLayout,
  Login,
  SearchFeed,
  Tweets,
  VideoDetails,
  SignUp,
  ChannelDetails,
  Myvideos,
  Playlist,
  History
} from './Pages/index.js'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Subscribed, Subscribers } from './Components/index.js'

let persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
            <Home />
        )
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: '/channel/:username',
        element: (
          <AuthLayout authentication={true}>
            <ChannelDetails />
          </AuthLayout>
        ),
        children: [
          {
            path: '/channel/:username/my-videos/:id',
            element: (
              <Myvideos />
            )
          },
          {
            path: '/channel/:username/playlists/:id',
            element: (
              <Playlist />
            )
          },
          {
            path: '/channel/:username/subscribers/:id',
            element: (
              <Subscribers />
            )
          },
          {
            path: '/channel/:username/subscribed/:id',
            element: (
              <Subscribed />
            )
          }
        ]
      },
      {
        path: '/videos/:id',
        element: (
          <AuthLayout>
            <VideoDetails />
          </AuthLayout>
        )
      },
      {
        path: '/tweets',
        element: (
          <AuthLayout>
            <Tweets />
          </AuthLayout>
        )
      },
      {
        path: '/history',
        element: (
          <AuthLayout>
            <History />
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
)
