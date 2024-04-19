import React,{useState, useEffect} from 'react'
import { FetchComment } from '../../FetchfromBackend/index.js'
import { CommentContent, UserAvatar, Button } from '../index.js'
import axios from 'axios'
import { addComment as addcommentslice } from '../../store/commentSlice.js'
import { useDispatch , useSelector} from 'react-redux'

function GetVideoComments({
  id=null
}) {
  const StoredCommentlength = useSelector(state => state.commentReducer.totalComments)
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')
  const currentUser = useSelector(state => state.authReducer.userData)
  const dispatch = useDispatch()

  const showButton = (e) => {
    e.preventDefault()
  
    if(e.target.name === 'input'){
      setShow((prev) => prev=true)
    }else if(e.target.name === 'button'){
      setShow((prev) => prev=false)
      setComment(prev => prev='')
    }
  }

  const addComment = async(e) => {
    e.preventDefault()
    const data = await axios.post(`/api/v1/comment/add-comment/${id}?content=${comment}`)
    const data2 = data.data.data
    Object.assign(data2, {ownerUsername: currentUser.username, ownerAvatar: currentUser.avatar, Likes: 0, likebyme: false})
    dispatch(addcommentslice(data2))
    setComment(prev => prev='')
  }

  return (
    <>
      <h1 className='px-3 pt-2 text-2xl font-bold text-white'>{StoredCommentlength} Comments</h1>
      <div className='px-3 gap-3 flex mt-3 flex-row w-full h-full'>
        <UserAvatar/>
        <div className='flex flex-col w-full'>
          <input 
            name='input'
            onClick={(e) => showButton(e)} 
            onKeyDown={(e) => {
              if(e.key === ' '){
                e.stopPropagation()
              }
            }}
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            type="text" 
            placeholder='Add a Comment...' 
            className='outline-none border-b border-gray-500 bg-gray-950 w-full text-white pl-2'
          />
          <div className={`${!show && 'hidden'} flex gap-3 flex-row justify-end`}>
            <Button name='button' onClick={(e) => showButton(e)} label='Cancel' classname='rounded-3xl h-10' />
            <Button onClick={(e) => addComment(e)} label='Comment' classname='rounded-3xl h-10'/>
          </div>
        </div>
      </div>
      {
        <CommentContent videoId={id}/>
      }
    </>
  )
}

export default GetVideoComments
