import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loadNews = createAsyncThunk("news/loadNews",async ()=>{
    const response = await axios.get('http://api.mediastack.com/v1/news?access_key=4f7a400f8714c28104c5a2699bd0d877&keywords=cryptocurrency')
    return response.data.data
})

export const newsSlice = createSlice({
    name:"news",
    initialState:{
        status:"idle",
        error:null,
        news:[]
    },
    reducers:{
    },
    extraReducers:{
        [loadNews.pending]:(state) => {
            state.status = "loading"
        },
        [loadNews.fulfilled]:(state,action) =>{
            state.status = "fulfilled"
            state.news = action.payload
        },
        [loadNews.error]:(state,action)=>{
            state.status = "error"
            state.error = action.error.message
        }
    }
})

export default newsSlice.reducer