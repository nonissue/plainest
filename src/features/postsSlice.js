import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost(state, action) {
      // post should be
      // id, link, caption, images
      const { post } = action.payload;
      state.push({ post });
    },
  },
});

export const { addTodo, toggleTodo } = postsSlice.actions;
export default postsSlice.reducer;
