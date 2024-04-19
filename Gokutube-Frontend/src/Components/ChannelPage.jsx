import React, { useState, useEffect } from 'react'
import {Button, UserAvatar} from './index.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom'
import { getUserChannelProfile } from '../FetchfromBackend/FetchUser.js'
import { login as authlogin} from '../store/authSlice.js'
import axios from '../api/axios.js'

function ChannelPage() { 
  const {username} = useParams()
  const [user, setUser] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get('id');
  let pathname = location.pathname
  pathname = pathname.split('/')

  useEffect(() => {
    if(id || username){
      (async()=>{
        const data = await getUserChannelProfile({id,username})
        setUser(data)
      })()
    }

    if(pathname.length>=3){
      setIsActive(pathname[3])
    }
  },[])

  const currentuser = useSelector(state => state.authReducer.userData)
  const [isActive, setIsActive] = useState(null)
  const [showcustomizeoptions, setshowcustomizeoptions] = useState(false)

  const toggleSubscription = async (e) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/subscription/toggle-subscription/${user._id}`)
    if(data.status === 200){
      setUser({...user, isSubscribed: !user.isSubscribed})
    }
  }

  const customizeChannel = async (e) => {
    const {fname, avatar, coverImage} = e.target
    console.log(fname.value, avatar.value, coverImage.value);
    
    let newuser=null;
    let flag1=true;
    let flag2=true;
    let flag3=true;
    if(avatar.value){
      const formData = new FormData();
      formData.append('avatar', avatar.files[0])
      const data = await axios.patch(`/api/v1/users/update-avatar`, formData)
      console.log(data);
      if(data.status !== 200){
        flag1=false;
      }else{
        newuser=data.data.data
      }
    }

    if(coverImage?.value){
      const formData = new FormData();
      formData.append('coverImage', coverImage.files[0])
      const data = await axios.patch(`/api/v1/users/update-coverImage`, formData)
      console.log(data);
      if(data.status !== 200){
        flag2=false;
      }else{
        newuser=data.data.data
      }
    }

    if(fname?.value){
      const data = await axios.patch(`/api/v1/users/update-account`, {
        fullName: fname.value
      })
      console.log(data);
      if(data.status !== 200){
        flag3=false;
      }else{
        newuser=data.data.data
      }
    }

    if(flag1 && flag2 && flag3){
      if(newuser){
        dispatch(authlogin(newuser))
      }
      window.location.reload()
    }
  }

  return (
    <div className='h-full w-full bg-gray-950'>
      {
        user && user.coverImage ?
          <img src={user?.coverImage} alt="" 
            style={{height: '23vh'}}
            className='w-full object-cover object-center rounded-2xl border-2 border-gray-800'
          />
        :
        <></>
      }
    
      <div
        className='flex flex-row justify-center w-full items-center gap-16'
        style={{height: '30vh'}}
      >
        <UserAvatar classname={'h-40 w-40'} avatar={user?.avatar}/>
        <div className='flex flex-col gap-1'>
          <h1 className='text-white text-4xl font-bold'>{user.fullName}</h1>
          <h1 className='text-white'>@{user.username}</h1>
          <h1 className='text-white'>Subscribers: {user.subscribersCount}</h1>
          <h1 className='text-white'>Subscribed to: {user.SubscribedToCount}</h1>
          {
            currentuser._id === user._id ? 
              <>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    setshowcustomizeoptions(prev => !prev)
                  }}
                  label='Customize Channel' classname='mt-1 rounded-3xl'
                />
                {
                  showcustomizeoptions &&
                  <div 
                    onClick={(e) => {
                      setshowcustomizeoptions(false)
                    }}
                    className='fixed h-[100vh] w-[100vw] top-0 left-0 flex justify-center items-center'
                  >
                    <div
                      onClick={(e) => {
                        // e.preventDefault()
                        e.stopPropagation()
                      }}
                      className='flex flex-row items-center gap-5 px-5 py-2 bg-gray-700 h-72 rounded-xl w-[30rem]'
                    >
                      <img src={user?.avatar} className='rounded-full h-36 w-36 object-cover object-center' />
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault()
                            customizeChannel(e)
                          }}
                          className='flex justify-center h-full w-full flex-col gap-1'
                        >
                          <label className='text-gray-400'>fullname</label>
                          <input name='fname' className='w-56 outline-none bg-gray-200 pl-1 rounded-sm' type="text" />
                          <label className='text-gray-400'>avatar</label>
                          <input name='avatar' className='mb-2' type="file" />
                          <label className='text-gray-400'>coverImage</label>
                          <input name='coverImage' type="file" />
                          <Button type='submit' label='Submit' />
                        </form>
                    </div>
                  </div>
                }
                
              </>
            :
              <>
              {
                user.isSubscribed ?
                  <Button onClick={(e) => toggleSubscription(e)} label='UnSubscribe' classname='mt-1 bg-gray-500 hover:bg-gray-700 rounded-3xl'/>
                  :
                  <Button onClick={(e) => toggleSubscription(e)} label='Subscribe' classname='mt-1 rounded-3xl'/>
              }
              </>
          }
        </div>
      </div>

      <div className=''>
        <div className='flex flex-row gap-10 mb-2'>

            <button className={`text-white text-lg ${isActive === 'my-videos' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
              onClick={(e)=> {
                e.preventDefault()
                setIsActive('my-videos')
                navigate(`/channel/${username}/my-videos/${user._id}`)
              }}
            >Videos</button>

            <button className={`text-white text-lg ${isActive === 'playlists' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
              onClick={(e)=> {
                e.preventDefault()
                setIsActive('playlists')
                navigate(`/channel/${username}/playlists/${user._id}`)
              }}
            >Playlists</button>

          {
            currentuser._id === user._id &&
            <>
              <button className={`text-white text-lg ${isActive === 'subscribed' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
                onClick={(e)=> {
                  e.preventDefault()
                  setIsActive('subscribed')
                  navigate(`/channel/${username}/subscribed/${user._id}`)
                }}
              >Subscribed</button>

              <button className={`text-white text-lg ${isActive === 'subscribers' ? 'border-b-4 border-gray-400' : 'hover:border-b-4 border-gray-600'} hover:duration-200 hover:transition-all`}
                onClick={(e)=> {
                  e.preventDefault()
                  setIsActive('subscribers')
                  navigate(`/channel/${username}/subscribers/${user._id}`)
                }}
              >Subscribers</button>
            </>
          }
          
        </div>
      </div>
    </div>
  )
}

export default ChannelPage