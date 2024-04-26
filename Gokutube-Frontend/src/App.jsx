import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Header,
  SideBar
} from './Components/index.js'
// import { useDispatch } from 'react-redux'
// import {logout as authLogout} from './store/authSlice.js'
import { useLocation } from 'react-router-dom'

function App() {
  // const dispatch = useDispatch()
  const [loader , setloader] = useState(true)
  const location = useLocation()
  const title = location.pathname.split('/')[1]  

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 400)
    // dispatch(authLogout())

  })

  window.addEventListener('popstate', function(event) {
    // Your event handling code here
    window.location.reload()
  });

  // window.addEventListener('beforeunload', function (event) {
  //   // Code to execute before the window is closed or navigated away
  //   // You can use this to show a confirmation dialog, save data, etc.

  //   // For example, you might want to display a custom message
  //   dispatch(authLogout())
  // });

  return (
    <div className='bg-gray-950 h-full'>
      <Header />
      <div className='flex flex-row w-full h-full pt-[10vh]'
      >
        {
          title === 'videos' ? null
          :
          <div className='fixed h-full'>
            <SideBar/>
          </div>
        } 
        
        {
          loader &&
          <div className='ml-56 w-full h-[90vh] flex justify-center items-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100'></div>
          </div>
        }
        <div className={`${title==='videos' ? '' : 'ml-56'} ${loader && 'hidden'} w-full h-full`}>
          <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default App