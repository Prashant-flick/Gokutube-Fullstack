import React,{useState, useEffect, useRef} from 'react'
import { VideoPage } from '../Components/index.js'

function VideoDetails() {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1500)
  },[loader])
  
  return (
    <div className='h-full relative w-full bg-gray-950'>
    {
      loader &&
      <div className='w-full h-[90vh] flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100'>
        </div>
      </div>
    }
      <div className={`w-full h-full ${loader && "hidden"}`}>
        <VideoPage />
      </div>
    </div>
  )
}

export default VideoDetails