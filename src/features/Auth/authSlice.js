import {createSlice} from "@reduxjs/toolkit"
import {GetState} from '../LocalStorage/GetState'

const localState = GetState()

export const authSlice = createSlice({
    name:"auth",
    initialState:localState,
    reducers:{
        setToken: (state,action)=>{
            state.token = action.payload
        },
        setLogin:(state)=>{
            state.login = true
        },
        setLogout:(state)=>{
            state.login = false
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        updateName: (state,action) => { 
            state.user.name = action.payload
        },
        updateUsername: (state,action) => { state.user.username = action.payload },
        updateBio: (state,action) => { state.user.bio = action.payload },
        addFollowing: (state,action) => { state.user.following.push(action.payload) },
        removeFollowing: (state,action) => { state.user.following.pop(action.payload) }
    }
})

export const {setToken,setLogin,setLogout,setUser,updateName,updateBio,updateUsername,addFollowing,removeFollowing} = authSlice.actions
export default authSlice.reducer