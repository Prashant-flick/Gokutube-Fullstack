import React,{useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { FetchUserPlaylist } from '../../FetchfromBackend/FetchPlaylist'
import { setplaylist as setplaylistdata } from '../../store/playlistSlice'
import { useDispatch } from 'react-redux'
import { PlaylistVideo } from '../index.js'

function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const {id} = useParams()
  const dispatch = useDispatch()
  const [loader, setloader] = useState(true)

  useEffect(() => {
    if(id){
      ;(async () => {
        const data = await FetchUserPlaylist(id)

        if(data){
          setPlaylists(data)
          dispatch(setplaylistdata(data))
        }
      })()
    }

    setTimeout(() => {
      setloader(false)
    }, 1000);
  },[id])
  

  return (
    <div className={`${playlists.length ? 'grid grid-cols-3 gap-4 px-5 pt-4 h-full min-h-[51vh] w-full mt-4' : 'flex justify-center items-center w-full h-[53vh]'}`}>
      {
        !loader &&
        <>
        {
          playlists.length>0 && playlists.map((playlist, index) => {
            return (
              <div
                key={index}
                className='flex flex-col relative h-full w-full rounded-lg justify-center items-center'
              >
                <PlaylistVideo playlist={playlist} index={index}/>
              </div>
            )
          })
        }
        </>
      }
      
    </div>
  )
}

export default Playlists