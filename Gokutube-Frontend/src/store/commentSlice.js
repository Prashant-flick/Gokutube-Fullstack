import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalComments: 0,
    commentData: [],
}

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentData(state, action) {
      state.commentData = action.payload.comments;
      state.totalComments = action.payload.totalComments;
    },
    addComment: (state, action) => {
      state.commentData = [action.payload, ...state.commentData]
      state.totalComments++
    },
    deleteComment: (state, action) => {
      state.commentData = state.commentData.filter(comment => comment._id !== action.payload._id)
      state.totalComments--
    },
    updateComment: (state, action) => {
      state.commentData = state.commentData.map(comment => {
        if(comment._id === action.payload._id) {
          comment.content = action.payload.content
        }
        return comment
      })
    },
    clearcomment: (state) => {
      state.commentData = []
      state.totalComments = 0
    }
  },
})

export const {addComment, deleteComment, updateComment, setCommentData, clearcomment} = commentSlice.actions

export default commentSlice.reducer