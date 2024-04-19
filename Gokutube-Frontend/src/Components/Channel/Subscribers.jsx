import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { SubscribedChannelDetails } from '../index.js'

function Subscribers() {

  const [subscribers, setsubscribers] = useState([])
  const {id} = useParams()
  const [limit, setlimit] = useState(10)
  const [hasMore, sethasMore] = useState(true)
  const [loader, setloader] = useState(true)

  useEffect(() => {
    ;(async() => {
      const data = await axios.get(`/api/v1/subscription/get-subscribers/${id}?limit=${limit}`)
      setsubscribers(data.data.data)
    })()
    setTimeout(() => {
      setloader(false)
    }, 700);
  },[id])

  const fetchMoreData = async() => {

  }

  return (
    <div className='h-full w-full min-h-[53vh]'>
      <div className='px-20 py-6 flex flex-col'>
        <InfiniteScroll
          dataLength={limit}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {
            !loader &&
            <>
            {
              subscribers.length ? subscribers.map((item, index) => {
                return (
                    <div key={index} className='h-full w-full py-4 hover:bg-gray-800 px-4 rounded-2xl'>
                      <SubscribedChannelDetails id={item.subscriber}/>
                    </div>
                )
              })
              :
              <h1 className='text-white'>No Subscribers</h1>
            }
            </>
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Subscribers