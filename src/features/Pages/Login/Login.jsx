import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux"
import { setLogin,setLogout,setToken,setUser } from '../../Auth/authSlice'
import { useLocation,useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {login} = useSelector(state => state.auth)

    const LoginButtonPressed = async () =>{
        try{
            if(login){
                localStorage?.removeItem('login')
                dispatch(setLogout())
                navigate('/')
            }else{
                const response = await axios.post('https://cryptoworld-backend.herokuapp.com/user/login',{
                    username:username,
                    password:password
                    })
                if(response.status === 200){
                    dispatch(setLogin())
                    dispatch(setToken(response.data.token))
                    dispatch(setUser(response.data.user))
                    localStorage.setItem('login',JSON.stringify({login:true,token:response.data.token,user:response.data.user}))
                    state?navigate(state.from):navigate('/')
                }else{
                    console.log("login failed")
                }
            }
        }catch(err){
            console.log(err.message)
        }
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                <div className="login-heading">Login</div>
                <div className="login-title">Username</div>
                <input className="login-input" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username"/>
                <div className="login-title">Password</div>
                <input className="login-input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"/>
                <button className="login-button" onClick={()=>LoginButtonPressed()}>{login ? "Log out":"Login"}</button>
                <div className="login-subtext">Not registered? <Link to="/signup">Sign up here!</Link></div>
            </div>
        </div>
    )
}

export default Login
