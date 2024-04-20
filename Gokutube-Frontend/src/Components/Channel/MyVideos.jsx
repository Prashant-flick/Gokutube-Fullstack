import React, { useEffect, useState } from 'react'
import { fetchUserVideo} from '../../FetchfromBackend'
import { useParams } from 'react-router-dom'
import { Input, Button, MyvideosFeed } from '../index.js'
import { setdata as setvideodata, adddata as addvideodata} from '../../store/videoSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

function MyVideos() {
  const videodata = useSelector(state => state.videoReducer.videoData)
  const videolen = useSelector(state => state.videoReducer.length)
  const [showUploadSection, setShowUploadSection] = useState(false)
  const {id} = useParams()
  const dispatch = useDispatch()
  const [length, setlength] = useState(0)
  const currentUser  = useSelector(state => state.authReducer.userData)

  useEffect(() => {
    if(id){
      ;(async () => {
        const data = await fetchUserVideo(id)
        if(data){
          // setVideos(data.videos)
          setlength(data.length)
          dispatch(setvideodata(data))
        }
      })()
    }
    else{
      setlength(videolen)
    }

  },[])

  //Upload Video
  const uploadVideo = async(e) => {
    e.preventDefault()
    const { Title, Description, VideoFile, Thumbnail } = e.target;
    const form = new FormData(); 

    //appending files
    form.append('videoFile', VideoFile.files[0]);
    form.append('thumbnail', Thumbnail.files[0]);

    //appending other data
    form.append('title', Title.value);
    form.append('description', Description.value);

    setShowUploadSection(prev=> prev=false)
    
    try {
      const data = await axios.post('/api/v1/videos/publish-video', form,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log(data);

      dispatch(addvideodata(data.data.data))
      
    } catch (error) {
      console.log(error);
      setShowUploadSection(prev=> prev=false)
      console.error('error while uploading video');
    }
  }

  return (
    <>
      <div className='flex justify-center mb-4'>
        {
          showUploadSection ? 
          <div onClick={(e)=>setShowUploadSection(prev=> prev=!prev)} className='top-0 z-20 left-0 flex items-center justify-center bg-white bg-opacity-20 fixed w-full h-full'>
            <form 
              onSubmit={(e)=>uploadVideo(e)} 
              className='bg-gray-500 flex flex-col relative z-20 rounded-3xl pt-4 items-center gap-2 w-[25%] h-[55%] '
              onClick={(e) => e.stopPropagation()}  
            >
              <h1 className='text-3xl font-bold mb-1'>Input</h1>
              <Input className="w-[70%]" label='Title' name='Title' type='text' />
              <Input className="w-[70%]" label='Description' name='Description' type='text' />
              <Input label='VideoFile' name='VideoFile' type='file' />
              <Input label='Thumbnail' name='Thumbnail' type='file' />
              <Button label='Upload'/>
            </form>
          </div>
          :
          <></>
        }
        {
          currentUser?._id === id &&
            <Button onClick={(e)=>setShowUploadSection(prev=> prev=!prev)} label='Upload Video' classname='ml-3 mb-0 mt-1 rounded-3xl'/>
        }
      </div>
    {
      videodata?.length ?
      <div className={`${videodata?.length ? 'grid grid-cols-3 px-5 h-full' : 'flex justify-center items-center h-[29vh]'}`}>
        {
          videodata?.length>0 && videodata.map((video, index) => {
            return (
              <div
                key={index}
                className='flex flex-col rounded-lg mt-1 w-full h-full'
              >
                <MyvideosFeed video={video}/>
              </div>
            )
          })
        }
      </div>
      :
      <div className='text-white h-[50vh] flex justify-center items-center pl-3 text-3xl font-bold'>
        NO VIDEOS
      </div>
    }
    </>
  )
}

export default MyVideos