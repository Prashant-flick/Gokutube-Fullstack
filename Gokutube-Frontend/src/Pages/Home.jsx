import React,{useState,useEffect} from 'react'
import { 
  Feed,
} from '../Components/index.js'

function Home() {

  const [loader , setloader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setloader(false)
    }, 800)
  })

  return (
    <>
        {
          loader &&
          <div className='w-full h-[90vh] flex justify-center items-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100'></div>
          </div>
        }
        <div className={`h-full w-full ${loader && "hidden"}`}>
          <Feed />
        </div>
    </>
    
  )
}

export default Home