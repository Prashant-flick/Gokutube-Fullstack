import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CustomVideoPlayer({
  video=null
}) {

  const allVideos = useSelector(state => state.videoReducer.videoData)
  let playlistVideos = useSelector(state => state.playlistReducer?.PlaylistData)
  if(playlistVideos){
    playlistVideos = playlistVideos[0]?.videos
  }
  const vidRef = useRef(null)
  const [ishovered, setishovered] = useState(false)
  const [play, setplay] = useState(true)
  const [nextvideoindex, setnextvideoindex] = useState(0)
  const [prevvideoindex, setprevvideoindex] = useState(0)
  const [volume, setvolume] = useState(30)
  const [currentTime, setcurrentTime] = useState(0)
  const [duration, setduration] = useState(0)
  const [dursec, setdursec] = useState(0)
  const [durmin, setdurmin] = useState(0)
  const [durhours, setdurhours] = useState(0)
  const [currsec, setcurrsec] = useState(0)
  const [currmin, setcurrmin] = useState(0)
  const [currhours, setcurrhours] = useState(0)
  const [fullscreen, setfullscreen] = useState(false)
  const [nextvideo, setnextvideo] = useState(false)
  const navigate = useNavigate()

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isplaylist = queryParams.get('playlist');
  console.log(isplaylist);
  

  useEffect(() => {
    console.log(isplaylist);
    if(isplaylist){
      playlistVideos.map((vid, index) => {
        if(vid === video._id){
          if(index+1 === playlistVideos.length){
            setnextvideoindex(0)
            setprevvideoindex(index-1)
            return
          }else if(index===0){
            setprevvideoindex(playlistVideos.length-1)
            setnextvideoindex(index+1)
          }else{
            setprevvideoindex(index-1)
            setnextvideoindex(index+1)
          }
        }
      })
    }else{
      allVideos.map((vid, index) => {
        if(vid._id === video._id){
          if(index+1 === allVideos.length){
            setnextvideoindex(0)
            setprevvideoindex(index-1)
            return
          }else if(index===0){
            setprevvideoindex(allVideos.length-1)
            setnextvideoindex(index+1)
          }else{
            setprevvideoindex(index-1)
            setnextvideoindex(index+1)
          }
        }
      })
    }

    
    
    setdursec(Math.floor(vidRef.current.duration%60))
    setdurmin(Math.floor((vidRef.current.duration/60)%60))
    setdurhours(Math.floor(vidRef.current.duration/3600))
    setduration(Math.floor(vidRef.current.duration))
  })

  return (
    <div className={`h-full w-full relative`}>
      { nextvideo && 
        <div className='w-full z-30 h-full flex justify-center items-center absolute'>
          <button 
            onClick={(e) => {
              e.preventDefault()
              if(isplaylist){
                navigate(`/videos/${playlistVideos[nextvideoindex]}?playlist=true`)
              }else{
                navigate(`/videos/${allVideos[nextvideoindex]?._id}`)
              }
              window.location.reload()
            }}
            className='text-white bg-black p-6 rounded-full font-bold text-2xl'
          >
            NEXT
          </button>
        </div>
      }
      { 
        ishovered &&
        <div 
          onMouseEnter={(e) => setishovered(true)}
          onMouseLeave={(e) => setishovered(false)}

          className='px-1 z-10 w-full items-center bg-gray-950 bg-opacity-10 flex flex-col absolute bottom-0'
        >

          <label
            className='text-white w-full px-1'
          >
            <input 
              className='w-full h-1 cursor-pointer' 
              type="range"
              value={Math.floor(currentTime)} 
              min="0" 
              max={duration}  
              onChange={(e) => {
                vidRef.current.currentTime = Math.floor(e.target.value)
                setcurrentTime(Math.floor(e.target.value))
              }}
            />
          </label>

          <div className='h-full w-full flex flex-row justify-between'>
            <div className='flex items-center'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  vidRef.current.play()
                  setplay(true)
                }}
                className={`text-white py-2 px-3 ${play && 'hidden'}`}
              >
                <span class="material-symbols-outlined">
                  play_arrow
                </span>
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  vidRef.current.pause()
                  setplay(false)
                }}
                className={`text-white outline-black py-2 px-3 ${!play && 'hidden'}`}
              >
                <span class="material-symbols-outlined">
                  pause
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  if(isplaylist){
                    console.log(playlistVideos[prevvideoindex]);
                    console.log(playlistVideos[nextvideoindex]);
                    console.log(video._id);
                    navigate(`/videos/${playlistVideos[prevvideoindex]}?playlist=true`)
                  }else{
                    navigate(`/videos/${allVideos[prevvideoindex]?._id}`)
                  }
                  window.location.reload()
                }}
                className='text-white py-2 px-3'
              >
                <span class="material-symbols-outlined">
                  skip_previous
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  if(isplaylist){
                    navigate(`/videos/${playlistVideos[nextvideoindex]}?playlist=true`)
                  }else{
                    navigate(`/videos/${allVideos[nextvideoindex]?._id}`)
                  }
                  window.location.reload()
                }}
                className='text-white py-2 px-3'
              >
                <span class="material-symbols-outlined">
                  skip_next
                </span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  setvolume(0)
                  vidRef.current.volume = 0.00
                }}
                className={`text-white py-2 pl-3 pr-2 ${volume == 0 ? 'hidden' : ''}`}
              >
                <span class="material-symbols-outlined">
                  volume_up
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setvolume(50)
                  vidRef.current.volume = 0.50
                }}
                className={`text-white py-2 pl-3 pr-2 ${volume == 0 ? '' : 'hidden'}`}
              >
                <span class="material-symbols-outlined">
                  volume_off
                </span>
              </button>
              <label
                className='text-white py-2 px-3'
              >
                <input 
                  className='w-20'
                  type="range"
                  value={volume}
                  onChange={(e) => {
                    setvolume(e.target.value)
                    vidRef.current.volume = 0.01*e.target.value;
                  }} 
                  min="0" 
                  max="100" 
                  step={0.01} 
                />
              </label>

              <label
                className='text-white py-2 px-3'
              >
                <label
                >
                  {currhours!=0 ? `${ currhours<10 ? `0${currhours}:` : `${currhours}:`}` : ``} {currmin<10 ? `0${currmin}` : currmin}:{currsec<10 ? `0${currsec}` : currsec}
                </label>
                /
                <label>
                  {durhours!=0 ? `${ durhours<10 ? `0${durhours}:` : `${durhours}:`}` : ``} {durmin<10 ? `0${durmin}` : durmin}:{dursec<10 ? `0${dursec}` : dursec}
                </label>
              </label>
            </div>

            <div className='flex items-center'>
              <button
                className='text-white py-2 px-3'
              >
                <span class="material-symbols-outlined">
                  autoplay
                </span>
              </button>
              
              <button
                className='text-white py-2 px-3'
              >
                <span class="material-symbols-outlined">
                  settings
                </span>
              </button>

              {/* {
                !fullscreen && */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    vidRef.current.requestFullscreen()
                    // setfullscreen(true)
                  }}
                  className='text-white py-2 px-3'
                >
                  <span class="material-symbols-outlined">
                    fullscreen
                  </span>
                </button>
              {/* }  */}

              {/* { 
                fullscreen && 
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    vidRef.current.exitFullscreen()
                    setfullscreen(false)
                  }}
                  className='text-white py-2 px-3'
                >
                  <span class="material-symbols-outlined">
                    fullscreen_exit
                  </span>
                </button>
              } */}
              
            </div>
          </div>

          
        </div>
      }  
      <video 
        onClick={(e) => {
          e.preventDefault()
          if(play){
            vidRef.current.pause()
            setplay(prev=> !prev)
          }else{
            vidRef.current.play()
            setplay(prev=> !prev)
          }
        }}

        tabIndex="0"
        onKeyDown={(e) => {
          if(e.key === 'f'){
            vidRef.current.requestFullscreen()
          }
          if(e.key === ' '){
            if(play){
              vidRef.current.pause()
              setplay(prev=> !prev)
            }else if(!play){
              vidRef.current.play()
              setplay(prev=> !prev)
            }
          }
          if(e.key === 'ArrowLeft'){
              vidRef.current.currentTime -= 5
          }else if(e.key === 'ArrowRight'){
            vidRef.current.currentTime += 5
          }
        }}

        onTimeUpdate={(e) => {
          e.preventDefault()
          setcurrentTime(Math.floor(vidRef.current.currentTime))
          setcurrsec(Math.floor(vidRef.current.currentTime%60))
          setcurrmin(Math.floor((vidRef.current.currentTime/60)%60))
          setcurrhours(Math.floor(vidRef.current.currentTime/3600))
          if(vidRef.current.currentTime >= vidRef.current.duration){
            setplay(false)
            vidRef.current.pause()
            setnextvideo(true)
            // setTimeout(() => {
            //   navigate(`/videos/${allVideos[nextvideoindex]?._id}`)
            // }, 3000);
          }
        }}
        ref={vidRef}
        onMouseEnter={() => setishovered(true)}
        onMouseLeave={() => setishovered(false)}
        src={video.videoFile} 
        autoPlay={play}
        className={`${ishovered ? '' : 'rounded-2xl'} outline-none w-full h-full overflow-hidden object-cover object-center`}
      />
    </div>
  )
}

export default CustomVideoPlayer