import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from '../../api/axios.js'
import { useDispatch, useSelector } from 'react-redux';
import { deletedata as deletevideo } from '../../store/videoSlice.js';

function MyvideosFeed({
    video=nulll
}) {
  const [showVideo, setShowVideo] = useState(false)
  const [showvideosettingicon, setshowvideosettingicon] = useState(false)
  const [showvideosetting, setshowvideosetting] = useState(false)
  const dispatch = useDispatch()
  const {id} = useParams()
  const currentUser = useSelector(state => state.authReducer.userData)

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
    if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] >= 0){
      if(date2[4].split(':')[1] - videoTime2[4].split(':')[1] === 1){
        return 'a minute ago'
      }
      return `${date2[4].split(':')[1] - videoTime2[4].split(':')[1]} minutes ago`
    }
  }

  const deleteVideo = async(e) => {
    e.preventDefault()
    console.log('here');
    const data = await axios.delete(`/api/v1/videos/delete-video/${video._id}`)
    if(data.status === 200){
      dispatch(deletevideo(data.data.data._id))
    }
  }

  return (
    <div
      className='h-full w-full p-4'
      onMouseEnter={() => {
        setshowvideosettingicon(prev => true)
      }}
      onMouseLeave={() => {
        setshowvideosetting(false)
        setshowvideosettingicon(prev => false)
        setShowVideo(false)
      }}
    >
      <Link to={`/videos/${video._id}`}>
        <video 
          onMouseLeave={() => {
            setShowVideo(false)
          }}
          controls
          autoPlay
          muted
          className={`w-full ${showVideo ? '' : 'hidden'} h-52 opacity-10 hover:opacity-100 transition-all ease-in-out duration-[3s] rounded-lg mb-2 border border-gray-700 overflow-hidden object-cover object-center`}>
          <source src={video.videoFile} type='video/mp4'/>
        </video>

        <img
          onMouseEnter={()=>{
            setShowVideo(true)  
          }}
          src={video.thumbnail} alt="Video Thumbnail"
            className={`rounded-lg mb-2 transition-opacity duration-500 ease-in-out ${showVideo ? 'hidden': ''} h-52 w-full overflow-hidden object-cover object-center`}
        />
      </Link>
  
        <div 
          className='ml-3 gap-2 flex flex-row mb-3 items-center relative'
          onMouseLeave={()=> {
            // setShowVideoOptions(false)
          }}
          onClick={(e) => {
            e.preventDefault()
            if(showvideosetting===true){
              setshowvideosetting(false)
            }
          }}
        >  
          <div className='flex flex-col'>
          <h1 className='text-white text-xl'>{video.title}</h1>
          <h2 className='text-gray-500'>{video.views} views - {CalcTimeFromNow()}</h2>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              setshowvideosetting(prev => true)
            }}
            className={`text-white absolute right-1 px-2 py-1 ${!showvideosettingicon && 'hidden'}`}
          >:</button>
          <div onClick={(e) => {
            e.stopPropagation()
          }} className={`flex absolute flex-col bg-gray-700 w-40 rounded-lg py-1 right-5 top-2 ${!showvideosetting && 'hidden'}`}>
            {
              currentUser?._id === id &&
              <button onClick={(e) => deleteVideo(e)} className='text-white border-b border-b-gray-600'>Delete</button>
            }
            <button className='text-white border-b border-b-gray-600'>Add to watch later</button>
            <button className='text-white'>Add to playlist</button>
          </div>
        </div>
    </div>
  )
}

export default MyvideosFeed
