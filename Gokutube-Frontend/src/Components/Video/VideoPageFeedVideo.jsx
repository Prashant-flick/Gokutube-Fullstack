import React,{useState, useEffect} from 'react'
import { FeedSingleVideo, PlaylistFeed } from '../index.js'
import { FetchAllVidoes, fetchVideoById } from '../../FetchfromBackend/index.js'
import { useParams, useLocation } from 'react-router-dom'
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from 'react-redux';
import { setdata } from '../../store/videoSlice.js'


function VideoPageFeedVideo() {
  const {id} = useParams()
  console.log(id);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isplaylist = queryParams.get('playlist');
  const playlistindex = queryParams.get('playlistindex');

  const [videos, setVideos] = useState([])
  const [limit, setlimit] = useState(10)
  const [length, setlength] = useState(0)
  const [hasMore, sethasMore] = useState(true)
  const dispatch = useDispatch()

  let playlist = useSelector(state => state.playlistReducer.PlaylistData);
  if(playlist){
    playlist = playlist[playlistindex]
  }

  useEffect(() => {
    ;(async()=>{
      const data = await FetchAllVidoes({limit})
      setVideos((prev) => prev=data.videos)
      setlength((prev) => prev=data.length)
      dispatch(setdata(data))
    })()
  },[id])

  const fetchMoreData = () => {
    if(limit-10>length){
      sethasMore(false)
      return
    }
    setTimeout(async() => {
      setlimit(prev => prev+10)
      const newlimit = limit+10
      const data = await FetchAllVidoes({limit:newlimit})
      setVideos(prev => prev=data.videos)
      dispatch(setdata(data))
    }, 500);    
  }

  return (
    <>
      {
        isplaylist && playlist &&
        playlist?.videos?.length>0 &&
        <div className='border border-gray-200 rounded-xl w-full h-full'>
        <div className='pl-2 py-2 w-full'>
          <div className='w-full flex flex-row justify-between'>
            <div>
              <h1 className='text-white text-bold text-lg px-2'>{playlist.name}</h1>
              <h1 className='text-gray-400 px-2'>{playlist.description}</h1>
            </div>
            <h1 className='text-gray-400 px-2'>Total Videos - {playlist.videos.length}</h1>
          </div>
        
          <div className='h-[70vh] w-full overflow-y-scroll overflow-hidden'>
            {/* <InfiniteScroll
            dataLength={limit}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            > */}
              {playlist.videos.map((data, index) => {            
                return(
                  <div 
                    key={index}
                    className='w-full'
                  >
                    {   
                      <PlaylistFeed videoid={data} isplaying={data==id} playlistid={playlist?._id}/>
                    }
                  </div>
              )})}
            {/* </InfiniteScroll> */}
            </div>
          </div>
        </div>
        
      }
      {
        videos && videos.length>0 &&
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {videos?.map((data, index) => {            
            return(
              <div 
                key={index}
                className='h-full w-full'
              >
                {
                  (data?._id != id) &&
                  <FeedSingleVideo video={data}/>
                }
              </div>
          )})}
        </InfiniteScroll>
      }
    </>
  )
}

export default VideoPageFeedVideo
