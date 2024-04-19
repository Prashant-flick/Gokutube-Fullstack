import React,{ useEffect, useState} from 'react'
import { ChannelPage } from '../../Components/index.js'
import { Outlet , useLocation } from 'react-router-dom'

function ChannelDetails() {
  let location = useLocation().pathname
  location = location.split('/')

  const [loader , setloader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 800)
  })

  return (
    <div className='h-full w-full'>
      {
        loader &&
        <div className='w-full h-[90vh] flex justify-center items-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100'></div>
        </div>
      }
      <div className={`px-20 py-2 flex flex-col w-full h-full bg-gray-950 ${loader && 'hidden'}`}
      >
        <ChannelPage/>
        <div className='border-t-2 border-gray-800 h-full w-full'>
          {
            location.length>3 ? <Outlet/>
            :
            <div className='flex justify-center items-center h-[60vh]'>
              <h1 className='text-white text-2xl font-bold'>What's on you mind?</h1>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ChannelDetails