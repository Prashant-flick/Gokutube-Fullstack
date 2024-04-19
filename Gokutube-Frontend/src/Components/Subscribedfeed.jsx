import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserChannelProfile } from '../FetchfromBackend';

function Subscribedfeed({
    id=null
}) {
    const [user, setuser] = useState(null)
    const navigate = useNavigate()
  
    useEffect(() => {
      ;(async() => {
        const data = await getUserChannelProfile({id, username:null})
        setuser(data)
      })()
    },[id])
  
    return (
        <div className='flex flex-row gap-4 items-center cursor-pointer'
          onClick={(e) => {
            e.preventDefault()
            navigate(`/channel/${user?.username}`)
            window.location.reload()
          }}
        >
          <img src={user?.avatar} className='h-8 rounded-full w-8 object-cover'/>
          <div>
            <h1 className='text-white text-lg'>{user?.fullName}</h1>
          </div>
        </div>
    )
}

export default Subscribedfeed