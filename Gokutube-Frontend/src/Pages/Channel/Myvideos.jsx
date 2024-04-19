import React,{useState, useEffect} from 'react'
import { MyVideos } from '../../Components/index.js'

function Myvideos() {

  const [loader , setloader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 1000);
  })

  window.addEventListener('popstate', function(event) {
    // Your event handling code here
    window.location.reload()
  });

  return (
    <>
      {
        !loader ?
        <div className={`h-full w-full`}>
          <MyVideos/>
        </div>
        :
        <div className='h-full w-full min-h-[53vh]'>

        </div>
      }
    </>
    
  )
}

export default Myvideos