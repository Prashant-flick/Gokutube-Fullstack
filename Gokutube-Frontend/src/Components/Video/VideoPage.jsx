import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { fetchVideoById, getUserChannelProfile } from '../../FetchfromBackend/index.js'
import { useParams } from 'react-router-dom'
import { Button, GetVideoComments, VideoPageFeedVideo, CustomVideoPlayer } from '../index.js'
import { useSelector } from 'react-redux'
import axios from 'axios'

function VideoPage() {
  const [subscribed, setSubscribed] = useState(false)
  const [user, setUser] = useState(null)
  const [video , setVideo] = useState(null)
  const [videolikes , setVideolikes] = useState(0)
  const { id } = useParams()
  const currentUser = useSelector(state => state.authReducer.userData)
  const [likedbyme, setlikedbyme] = useState(false)

  useEffect(() => {
    if(id){
      ;(async()=>{
        const data = await fetchVideoById({id, isplaying:true})
        setVideo((prev) => prev=data)
        setVideolikes(prev => prev=data?.totallikes)
        setlikedbyme(prev => prev=data?.likedbyme)

        if(data){
          ;(async()=>{
            const data2 = await getUserChannelProfile({
              id:data.owner,
              username: null
            })
            setSubscribed((prev) => prev=data2.isSubscribed)
            setUser((prev) => prev=data2)
          })()
        }
      })()
    }
  },[id])

  const toggleSubscribe = async(e) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/subscription/toggle-subscription/${user._id}`)
    if(data.status === 200){
      if(data.data.data === 'subscribed'){
        setSubscribed((prev) => prev=true)
      }else{
        setSubscribed((prev) => prev=false)
      }
    }
  }

  const toggleLike = async(e) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/like/toggle-video-like/${video._id}`)
    if(data.status === 200){
      if(data.data.data === 'liked'){
        setVideolikes((prev) => prev+1)
        setlikedbyme((prev) => prev=true)
      }else{
        setVideolikes((prev) => prev-1)
        setlikedbyme((prev) => prev=false)
      }
    }
  }

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

  return (
    <div
    onKeyDown={(e) => {
      if(e.key === ' '){
        e.preventDefault()
      }
    }}
    className='bg-gray-950 flex flex-row h-full w-full'>
        {
          video && user && 
          <div className='pl-20 pt-10 flex flex-col w-[67vw] max-w-[70vw] h-full'>
            <CustomVideoPlayer 
              video={video}
            />
            <h1 className='pt-3 ml-3 pb-2 text-white text-2xl font-bold'>{video.title}</h1>
            <div className='ml-3 gap-2 mt-1 flex flex-row mb-3 items-center w-full h-full'> 
              <div className='flex flex-row h-full w-full items-center'>
                <Link to={`/channel/${user.username}?id=${video.owner}`}>
                  <img src={user.avatar} alt="User Profile"
                  className='rounded-full h-12 w-12'
                  />
                </Link>
                
                <div className='pl-2 flex flex-col h-full'>
                  <h1 className='text-gray-100 text-2xl font-semibold'>{user.username}</h1>
                  <h2 className='text-gray-100'>{user.subscribersCount} subscribers</h2>
                </div>
                {
                  currentUser._id === user._id ?
                  null
                  :
                  <Button onClick={(e) => toggleSubscribe(e)} label={`${subscribed ? 'Subscribed' : 'Subscribe'}`} classname={`${subscribed ? 'bg-gray-500 hover:bg-gray-600' : ''} ml-3 mt-0 rounded-3xl h-full`}/>
                }
              </div>
              <div className='flex flex-row gap-3 w-full h-full items-center justify-end mr-3'>
                <Button onClick={(e) => toggleLike(e)} label={`${videolikes} Like`} classname={`rounded-3xl mt-0 h-full ${likedbyme && 'bg-gray-700'}`}/>
                <Button label='DisLike' classname='rounded-3xl mt-0 h-full'/>
                <Button label='Share' classname='rounded-3xl mt-0 h-full'/>
              </div>
            </div>

            <div className='px-3 rounded-2xl py-2 bg-gray-700 flex flex-col h-full w-full'>
              <div className='flex flex-row gap-4'>
                <h1 className='text-white font-semibold' >{video.views} views</h1>
                <h1 className='text-white font-semibold' >{CalcTimeFromNow()}</h1>
              </div>
              <h1 className='text-gray-300 mt-1'>{video.description}</h1>
            </div>

            <div className='w-full h-full flex flex-col'>
              <GetVideoComments id={video._id} />
            </div>
          </div>
        }
      <div className='flex flex-col w-[33vw] h-full px-4 pt-8'>
        <VideoPageFeedVideo/>
      </div>
    </div>
  )
}

export default VideoPage
