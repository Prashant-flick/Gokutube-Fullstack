import React, { useEffect, useState } from 'react'
import { fetchVideoById, fetchUserById } from '../../FetchfromBackend/index.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FetchUserPlaylist } from '../../FetchfromBackend/index.js'
import { useSelector, useDispatch } from 'react-redux'
import { setplaylist } from '../../store/playlistSlice.js'

function PlaylistFeed({
    videoid=null,
    isplaying=false,
    playlistid=null
}) {
  const [user, setUser] = useState(null)
  const [video, setvideo] = useState(null)
  const [hovered, sethovered] = useState(false)
  const [showsettingicon, setshowsettingicon] = useState(false)
  const [showsetting, setshowsetting] = useState(false)
  const currentuser = useSelector(state => state.authReducer.userData)
  const dispatch = useDispatch()

  useEffect(() => {
      ;(async()=>{
        const data = await fetchVideoById(videoid)
        setvideo(prev => data)
        if(data){
          const userdata = await fetchUserById(data.owner)
          setUser(prev => userdata)
        }
      })()
  },[])

  const CalcTimeFromNow = () => {
    let date  = new Date()
    let date2 = date.toString().split(' ')  
    let videoTime = new Date(video.createdAt)
    let videoTime2 = videoTime.toString().split(' ')

    if(date2[3] - videoTime2[3] > 0){
      if(date2[3] - videoTime2[3] === 1){
        return '1 year ago'
      }
      return `${date2[3] - videoTime2[3]} years ago`
    }
    if(date.getMonth() - videoTime.getMonth() > 0){
      if(date.getMonth() - videoTime.getMonth() === 1){
        return '1 month ago'
      }
      return `${date.getMonth() - videoTime.getMonth()} months ago`
    }
    if(date2[2] - videoTime2[2] > 0){
      if(date2[2] - videoTime2[2] === 1){
        return '1 day ago'
      }
      return `${date2[2] - videoTime2[2]} days ago`
    }
    if(date2[4].split(':')[0] - videoTime2[4].split(':')[0] > 0){
      if(date2[4].split(':')[0] - videoTime2[4].split(':')[0] === 1){
        return 'an hour ago'
      }
      return `${date2[4].split(':')[0] - videoTime2[4].split(':')[0]} hours ago`
    }
    if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] > 0){
      if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] === 1){
        return 'a minute ago'
      }
      return `${date2[4].split(':')[1] - videoTime2[4].split(':')[1]} minutes ago`
    }
  }

  const removevideo = async(e) => {
    const data = await axios.post(`/api/v1/playlist/remove-video-from-playlist/${playlistid}/${videoid}`)
    if(data.status==200){
      const data2 = await FetchUserPlaylist(currentuser?._id)
      dispatch(setplaylist(data2))
    }
  }
  
  return (
    <>
    { 
      video &&
      <div className={`py-2 pl-2 pr-2 flex h-full w-full relative flex-row ${isplaying && 'bg-gray-800'} rounded-xl`}
        onMouseEnter={() => {
          setshowsettingicon(true)
        }}
        onMouseLeave={() => {
          sethovered(false)
          setshowsettingicon(false)
          setshowsetting(false)
        }}
      >
          <img
            onMouseEnter={() => {
              sethovered(true)
            }}
            className={`rounded-xl ${hovered ? 'hidden' : ''} h-24 w-44 mr-3 overflow-hidden object-cover object-center`}
            src={video.thumbnail} alt="" 
          />
          <Link to={`/videos/${video._id}`}>
            <video 
            onMouseLeave={(e) => {
              sethovered(false)
            }}
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/videos/${video._id}`
            }} 
            autoPlay
            muted
            src={video.videoFile} 
            className={`rounded-xl ${hovered ? '': 'hidden'} h-24 w-44 mr-3 overflow-hidden object-cover object-center opacity-10 hover:opacity-100 transition-all ease-in-out duration-[3s]`}
          ></video>
          </Link>
        <div className='flex flex-col h-full'>
          <h1 className='text-white text-lg font-bold' >{video.title}</h1>
          {
            user && 
            <h1 className='text-gray-300 text-sm' >@{user.username}</h1>
          }
          <h1 className='text-gray-300 text-sm' >{video.views} views . {CalcTimeFromNow()} </h1>
        </div>

        {
          showsettingicon &&
          <button
            onClick={() => {
              setshowsetting(prev => !prev)
            }}  
            className='text-white absolute top-8 right-3 py-1 px-2'
          >
            :
          </button>
        }

        {
          showsetting &&
          <button
            onClick={(e) => {
              e.preventDefault()
              removevideo(e)
            }}
            className='absolute top-8 right-6 text-white bg-gray-600 px-2 py-1 rounded-lg'>
            remove video
          </button>
        }
        
      </div>
    }
    </>
  )
}

export default PlaylistFeed