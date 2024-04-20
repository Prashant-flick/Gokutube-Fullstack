import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Subscribedfeed } from './index.js'
// import { useParams } from 'react-router-dom'
import axios from 'axios'

function SideBar() {

  const [isActive, setIsActive] = useState('')
  const authstatus = useSelector(state => state.authReducer.status)
  const user = useSelector(state => state.authReducer.userData)
  const navigate = useNavigate()
  let value = window.location.href
  value = value.split('/')

  const [limit, setlimit] = useState(10)
  const [subscribed, setsubscribed] = useState([])

  useEffect(() => {
    if(value.length===4){
      if(value[3]==='history'){
        setIsActive('History')
      }else if(value[3]==='?subscription=true'){
        setIsActive('Subscriptions')
      }else{
        setIsActive('Home')
      }
    }else if(value.length>=5 && value[4]===`${user?.username}`){
      setIsActive('You')
    }else{
      setIsActive('Home')
    }

    ;(async() => {
      const data = await axios.get(`/api/v1/subscription/get-subscribed-to/${user?._id}?limit=${limit}`)
      setsubscribed(data.data.data)
    })()
  },[user])

  const changeActive = (e) => {
    if(e.name == 'Home'){
      navigate('/')
      window.location.reload()
    }
    else if(authstatus){
      navigate(e.path)
      window.location.reload()
    }else{
      navigate('/login')
      window.location.reload()
    }
  }

  return (
    <div className='z-50 px-1 pt-2 gap-1 flex flex-col w-56 bg-gray-950 sticky h-full' style={{height: '90vh'}}>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='Home' ? 'bg-gray-600 rounded-2xl' : 'bg-gray-950'} hover:bg-gray-600 hover:rounded-2xl hover:text-black`}
        onClick={(e)=> {
          e.preventDefault()
          changeActive({name:'Home', path:'/'})
        }}
      >
        <div className={`${isActive==='Home' ? 'text-black' : 'text-white'}`}>
          <span class="material-symbols-outlined">
            home
          </span>
        </div>
        <h1 className={`${isActive==='Home' ? 'text-black' : 'text-white'}`}>
          Home
        </h1>
      </button>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='Subscriptions' ? 'bg-gray-600 rounded-2xl' : 'bg-gray-950'} hover:bg-gray-600 hover:rounded-2xl`}
        onClick={(e)=> {
          e.preventDefault()
          changeActive({name:'Subscriptions', path:`/?subscription=true`})
        }}
      >
        <div className={`${isActive==='Subscriptions' ? 'text-black' : 'text-white'}`}>
          <span class="material-symbols-outlined">
            subscriptions
          </span>
        </div>
        <h1 className={`${isActive==='Subscriptions' ? 'text-black' : 'text-white'}`}>
          Subscriptions
        </h1>
      </button>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='You' ? 'bg-gray-600 rounded-2xl' : 'bg-gray-950'} hover:bg-gray-600 hover:rounded-2xl`}
        onClick={(e)=> {
          e.preventDefault()
          changeActive({name:'You', path:`/channel/${user?.username}`})
        }}
      >
        <div className={`${isActive==='You' ? 'text-black' : 'text-white'}`}>
          <span class="material-symbols-outlined">
            person
          </span>
        </div>
        <h1 className={`${isActive==='You' ? 'text-black' : 'text-white'}`}>
          Your Channel
        </h1>
      </button>
      <button className={`flex flex-row justify-start px-10 gap-3 py-3 ${isActive==='Tweets' ? 'bg-gray-600 rounded-2xl' : 'bg-gray-950'} hover:bg-gray-600 hover:rounded-2xl`}
        onClick={(e)=> {
          e.preventDefault()
          changeActive({name:'Tweets', path:`/`})
        }}
      >
        <div className={`${isActive==='Tweets' ? 'text-black' : 'text-white'}`}>
        <span class="material-symbols-outlined">
          chat
        </span>
        </div>
        <h1 className={`${isActive==='Tweets' ? 'text-black' : 'text-white'}`}>Tweets</h1>
      </button>

      <div className='border-b border-b-gray-700'></div>
      <button 
        onClick={(e) => {
          e.preventDefault()
          changeActive({name:'History', path:'/history'})
        }}
        className={`${isActive=='History' ? 'text-black bg-gray-600 rounded-2xl' : 'text-white'} hover:bg-gray-600 hover:rounded-2xl flex flex-row justify-start px-10 gap-3 py-3`}
      >
        <span class="material-symbols-outlined">
          history
        </span>
        History
      </button>

      <div className='border-b border-b-gray-700'></div>

      <div className='flex flex-col px-4 py-2'>
        <h1 className='text-white'>Subscriptions</h1>
        {
          subscribed?.map((item, index) => {
            return (
              <div key={index} className='flex flex-col gap-2 py-2 hover:bg-gray-900 px-2 rounded-lg'>
                <Subscribedfeed id={item?.channel}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SideBar