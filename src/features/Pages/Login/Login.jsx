import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux"
import { setLogin,setLogout,setToken,setUser } from '../../Auth/authSlice'
import { useLocation,useNavigate } from 'react-router-dom'
import './Login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BlockReserveLoading } from 'react-loadingg';

toast.configure()

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [loader,setLoader] = useState(false)
    const dispatch = useDispatch()
    const {state} = useLocation()
    const navigate = useNavigate()
    const {login} = useSelector(state => state.auth)

    const LoginButtonPressed = async () =>{
        try{
            if(login){
                localStorage?.removeItem('login')
                dispatch(setLogout())
                toast.success("Logged out successfully",{
                    autoClose:3000,
                    position:toast.POSITION.BOTTOM_RIGHT
                })
                navigate('/')
            }else{
                setLoader(true)
                const response = await axios.post('https://cryptoworld-social.herokuapp.com/user/login',{
                    username:username,
                    password:password
                    })
                if(response.status === 200){
                    setLoader(false)
                    toast.success("Logged in successfully",{
                        autoClose:3000,
                        position:toast.POSITION.BOTTOM_RIGHT
                    })
                    dispatch(setLogin())
                    dispatch(setToken(response.data.token))
                    dispatch(setUser(response.data.user))
                    localStorage.setItem('login',JSON.stringify({login:true,token:response.data.token,user:response.data.user}))
                    state?navigate(state.from):navigate('/')
                }
            }
        }catch(err){
            toast.error("Login failed! Invalid Username/Password",{
                autoClose:3000,
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }finally{
            setLoader(false)
        }
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                {!login && <>
                <div className="login-heading">Login</div>
                <div className="login-title">Username</div>
                <input className="login-input" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username"/>
                <div className="login-title">Password</div>
                <input className="login-input" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password"/>
                </>}
                {login && <div className="login-title">You're already logged in!</div>}
                <button className="login-button" onClick={()=>LoginButtonPressed()}>{login ? "Log out":"Login"}</button>
                <div className="login-subtext">Not registered? <Link to="/signup">Sign up here!</Link></div>
                {loader && <BlockReserveLoading color="purple"/>}
            </div>
        </div>
    )
}

export default Login
