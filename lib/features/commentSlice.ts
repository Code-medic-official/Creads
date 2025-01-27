import { createSlice } from "@reduxjs/toolkit";

type State = {refComment: string | null}

const initialState: State = {
  refComment: null
}

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setRefComment: (state, {payload}) => {
      state.refComment = payload
    }
  }
})

export const {setRefComment} = commentSlice.actions

export const refCommentSelector = (state) => state.comment.refComment

export default commentSlice.reducer