import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loadPosts = createAsyncThunk("posts/loadPosts",async ()=>{
    const response = await axios.get('https://cryptoworld-social.herokuapp.com/post');
    return response.data
})

export const postsSlice = createSlice({
    name:"posts",
    initialState:{
        status:"idle",
        error:null,
        posts:[]
    }, 
    reducers:{
        likePost: (state,action)=> {
            state.posts.map(post => post.post === action.payload.post.post?post.likes.push(action.payload.userId):post)
        },
        dislikePost: (state,action)=>{
            state.posts.map(post => post.post === action.payload.post.post?post.likes.pop(action.payload.userId):post)
        },
        addPost: (state,action)=> { state.posts.unshift(action.payload) },
        updatePostName: (state,action) => {
            state.posts.map(post => post.name === action.payload.oldName?post.name = action.payload.newName:post)
        },
        addComment: (state,action) =>{
            state.posts.map(post => post.post === action.payload.post? post.comments.push(action.payload.newComment):post)
        }
    },
    extraReducers:{
        [loadPosts.pending]:(state)=>{
            state.status = "loading"
        },
        [loadPosts.fulfilled]:(state,action)=>{
            state.status = "fulfilled"
            state.posts = action.payload.posts
        },
        [loadPosts.rejected]:(state,action)=>{
            state.status = 'error'
            state.error = action.error.message
        }
    }
})

export const {likePost,dislikePost,addPost,updatePostName,addComment} = postsSlice.actions
export default postsSlice.reducer