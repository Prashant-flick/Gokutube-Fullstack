import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FetchUserPlaylist } from '../FetchfromBackend/index.js';
import axios from 'axios'

function FeedVideo({
    video=null,
    myvideo=false
}) {
  const status = useSelector(state => state.authReducer.status)
  const [showVideo, setShowVideo] = useState(false)
  const [showvideosettingicon, setshowvideosettingicon] = useState(false)
  const [showvideosetting, setshowvideosetting] = useState(false)
  const playlists = useSelector(state => state.playlistReducer.PlaylistData)
  const [showplaylist, setshowplaylist] = useState(false)
  const [showcreateplaylist, setshowcreateplaylist] = useState(false)
  const [playlistname, setplaylistname] = useState(null)
  const [playlistdescription, setplaylistdescription] = useState(null)

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

  const addtoplaylist = async({e,index}) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/playlist/add-video-to-playlist/${playlists[index]?._id}/${video?._id}`)
    if(data.status === 200){
      setshowvideosetting(false)
      setshowplaylist(false)
      alert('Video added to playlist')
    }else if(data.status === 201){
      setshowvideosetting(false)
      setshowplaylist(false)
      alert('Video already exists in playlist')
    }
  }

  const createPlaylist = async(e) => {
    console.log('here');
    const data = await axios.post(`/api/v1/playlist/create-playlist/${video?._id}`, {
      name: playlistname,
      description: playlistdescription
    })

    if(data.status === 200){
      setshowplaylist(false)
      setshowcreateplaylist(false)
      setplaylistname(null)
      setplaylistdescription(null)
      alert('Playlist Created')
    }
  }

  return (
    <div
      className='h-full w-full p-4 relative'
      onMouseEnter={() => {
        setshowvideosettingicon(prev => true)
      }}
      onMouseLeave={() => {
        setshowvideosettingicon(prev => false)
        setshowvideosetting(false)
        setShowVideo(false)
      }}
    >
      <Link to={`/videos/${video._id}`}>
        <video 
          onMouseLeave={() => {
            setShowVideo(false)
          }}
          autoPlay
          muted
          className={`w-full ${showVideo ? '' : 'hidden'} ${myvideo? 'h-52 ' : 'h-60'} opacity-10 hover:opacity-100 transition-all ease-in-out duration-[3s] rounded-lg mb-2 border border-gray-700 overflow-hidden object-cover object-center`}>
          <source src={video.videoFile} type='video/mp4'/>
        </video>

        <img
          onMouseEnter={()=>{
            setShowVideo(true)  
          }}
          src={video.thumbnail} alt="Video Thumbnail"
            className={`rounded-lg mb-2 transition-opacity duration-500 ease-in-out ${showVideo ? 'hidden': ''}  ${myvideo? 'h-52' : 'h-60'} w-full overflow-hidden object-cover object-center`}
        />
      </Link>
  
        <div 
          className='ml-3 gap-2 flex flex-row mb-3 items-center relative'
        >
          
          <Link to={`${status ? `/channel/${null}?id=${video.owner}` : '/login'}`}>
            <img src={video.owneravatar} alt="User Profile"
            className='rounded-full h-10 w-10'
            />
          </Link>
  
          <div className='flex flex-col'>
          <h1 className='text-white text-xl'>{video.title}</h1>
          <h2 className='text-gray-500'>{video.views} views - {CalcTimeFromNow()}</h2>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              setshowvideosetting(prev => !prev)
            }}
            className={`text-white absolute right-1 px-2 py-1 ${!showvideosettingicon && 'hidden'}`}
          >
            :
          </button>
          {
            showvideosetting &&
            <div
              onMouseLeave={(e) => {
                e.preventDefault()
                setshowvideosetting(false)
              }}
              className='flex flex-col py-2 z-20 rounded-xl absolute border border-gray-700 right-0 top-10 bg-gray-700'>
              {
                playlists?.length>0 &&
                <button 
                  onClick={(e) => addtoplaylist({e,index:0})}
                  className='text-white border-b px-2 border-b-gray-400 w-full'
                >
                  Add to {playlists[0]?.name}
                </button>
              }
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  setshowplaylist(prev => !prev)
                }}
                className='text-white px-2'
              >
                Add to Playlist
              </button>
            </div>
          }
        </div>
    
        {
          showplaylist && 
          <div 
            onClick={(e) => {
              e.preventDefault()
              setshowplaylist(false)
              setshowcreateplaylist(false)
            }}
            className='fixed z-40 h-[100vh] w-[100vw] left-32 top-0 flex items-center justify-center'
          >
            <div className='flex w-56 min-h-20 rounded-xl bg-gray-800 z-50 flex-col items-center pb-2'>
              {
                showcreateplaylist &&
                  <form   
                    className='flex flex-col justify-center items-center py-2'
                  >
                    <input
                      name='name'
                      value={playlistname}
                      onChange={(e) => {
                        setplaylistname(e.target.value)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      type="text" placeholder='name' className='bg-transparent py-1 px-2 text-white'
                    />
                    <input 
                      name='description'
                      value={playlistdescription}
                      onChange={(e) => {
                        setplaylistdescription(e.target.value)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      type="text" placeholder='description' className='bg-transparent px-2 py-1 mb-2 text-white'
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        createPlaylist(e)
                      }}
                      className='bg-gray-500 w-28 rounded-lg'
                    >
                      submit
                    </button>
                  </form>
                
              }
              
              {
                !showcreateplaylist && 
                  <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setshowcreateplaylist(true)
                  }}
                  className='text-white text-lg font-semibold bg-gray-900 border-b px-4 pt-2 rounded-t-lg pb-1 border-b-gray-400 w-full'
                >
                  Create New Playlist
                </button>
              }
              

              {
                playlists?.length>0 && !showcreateplaylist &&
                playlists?.map((playlist, index) => {
                  return (
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addtoplaylist({e,index})
                      }}
                      className='text-white text-lg border-b px-4 py-1 border-b-gray-400 w-full'
                    >
                      {playlist?.name}
                    </button>
                  )
                })
              }
            </div>
          </div>
        }
    </div>
  )
}

export default FeedVideo