import { iComment } from "@/lib/database/models/comment.model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {refComment: iComment | null} = {
	refComment: null,
};

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		setRefComment: (state, { payload }) => {
			state.refComment = payload;
		},
	},
});

export const { setRefComment } = commentSlice.actions;

export const refCommentSelector = (state) => state.comment.refComment;

export default commentSlice.reducer