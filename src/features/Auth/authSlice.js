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
        }
    }
})

export const {setToken,setLogin,setLogout,setUser} = authSlice.actions
export default authSlice.reducer