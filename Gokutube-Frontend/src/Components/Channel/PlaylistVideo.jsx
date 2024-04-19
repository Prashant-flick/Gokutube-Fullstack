import React,{useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

function PlaylistVideo({
  playlist=null,
  index=null
}) {
  const [playlistoptionicon, setplaylistoptionicon] = useState(false)
  const [playlistoptions, setplaylistoptions] = useState(false)
  const [editplaylist, seteditplaylist] = useState(false)
  const [name, setname] = useState(null)
  const [description, setdescription] = useState(null)
  const {id} = useParams()
  const currentUser = useSelector(state => state.authReducer.userData)


  const deletePlaylist = async(e) => {
    const data = await axios.delete(`/api/v1/playlist/delete-playlist/${playlist?._id}`)
    if(data.status==200){
      window.location.reload()
    }
  }

  const updateplaylist = async(e) => {
    const data = await axios.post(`/api/v1/playlist/update-playlist/${playlist?._id}`, {
      name: name,
      description: description
    })
    if(data.status==200){
      window.location.reload()
    }
  }
  
  return (
    <div
      onMouseEnter={() => setplaylistoptionicon(true)}
      onMouseLeave={() => {
        setplaylistoptionicon(false)
        setplaylistoptions(false)
      }}
      className='rounded-xl w-full min-h-[40vh]'
    >
      <Link to={`${playlist.videos.length>0 ? `/videos/${playlist.videos[0]}?playlist=true&playlistindex=${index}` : window.location.href}`}>
          <img 
          className=' overflow-hidden w-full object-cover object-center h-56 pt-1.5 rounded-lg bg-gray-500'
          src={playlist.videos.length > 0 ? playlist.Thumbnail : 'https://res.cloudinary.com/dbmlz6pip/image/upload/v1712024540/yuunp9v1uivwfxjxtnqb.png'} 
          alt="Playlist Thumbnail"/>
      </Link>
      <div className='flex flex-row justify-between py-2 '>
          <h1 className='text-white ml-1'>{playlist.name}</h1>
          <h1 className='text-white mr-1'>{playlist.videos?.length} videos</h1>
      </div>
      <button className='text-white text-sm ml-1 mt-1 hover:text-gray-300'>view full playlist</button>
      {
        playlistoptionicon && currentUser?._id === id &&
        <button
          onClick={(e) => {
            e.preventDefault()
            setplaylistoptions(prev => !prev)
          }}
          className='absolute right-1 px-2 text-white'
        > 
            :
        </button>
      }
      
      {
          playlistoptions && 
          <div className='absolute right-6 flex flex-col bottom-4 bg-gray-800 py-1 rounded-xl'>
          <button 
            onClick={(e) => {
              e.preventDefault()
              deletePlaylist(e)
            }}
            className='text-white px-3'
          >
            Delete Playlist
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              seteditplaylist(true)
            }}
            className='text-white px-3'
          >
            Edit Playlist
          </button>

          {
            editplaylist &&
            <div 
              onClick={(e) => {
                e.preventDefault()
                seteditplaylist(false)
                setplaylistoptions(false)
              }}
              className='fixed z-10 h-[100vh] w-[100vw] top-0 left-24 flex justify-center items-center'>
              <div className='bg-gray-800 flex flex-col gap-2 justify-center items-center px-1 py-2 rounded-xl'>
                <input 
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  type="text" placeholder='name' className='bg-transparent text-white border-b border-b-gray-300'/>
                <input 
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  type="text" placeholder='description' className='bg-transparent text-white border-b border-b-gray-300'
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateplaylist(e)
                  }}
                className='rounded-md bg-gray-700 w-20'>
                  submit
                </button>
              </div>
            </div>
          }
          
          </div>
      }
    </div>
  )
}

export default PlaylistVideo