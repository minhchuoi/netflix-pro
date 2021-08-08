import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPost, deletePost, updatePost } from "../api";

export const getData = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await fetchPost();
  return data;
});

export const deleteData = createAsyncThunk(
  "posts/deletePosts",
  async (payload) => {
    console.log(payload);
    const { data } = await deletePost({uid: payload});
    return data;
  }
);

export const updateData = createAsyncThunk(
  "posts/updatePosts",
  async (payload) => {
    const { data } = await updatePost(payload);
    return data;
  }
);


const initialState = {
  data: [],
  status: null,
  modal: "modalFalse",
  dataSeries:[],
  dataFilms:[],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addFilms: (state, action) => {
      return {
        ...state,
        dataFilms: action.payload,
      };
    },
    addSeries: (state, action) => {
      return {
        ...state,
        dataSeries: action.payload,
      };
    },
    // closeModal: (state, action) => {
    //   return {
    //     ...state,
    //     modal: "modalFalse",
    //   };
    // },
  },
  extraReducers: {
    [getData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getData.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateData.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateData.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [updateData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default homeSlice.reducer;
export const { addSeries, addFilms } = homeSlice.actions;