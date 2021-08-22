import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Signup.css'
import {useNavigate} from 'react-router-dom'

function Signup() {

    const initialState = {
        firstName:"",
        lastName:"",
        email:"",
        username:"",
        password:"",
        bio:"",
        profilePicture:"",
        coverPicture:""
    }

    const [newUser,setNewUser] = useState(initialState)
    const navigate = useNavigate()

    const changeHandler = (e) =>{
        setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const signupButtonPressed = async() =>{
        const response = await axios.post('https://cryptoworld-backend.herokuapp.com/user/signup',newUser)
        if(response.status === 200){
            console.log("registration successful")
            navigate('/login')
        }
    }

    return (
        <div className="signup">
            <div className="signup-wrapper">
                <div className="signup-heading">Signup</div>
                <div className="signup-title">First name</div>
                <input className="signup-input" name="firstName" onChange={changeHandler} placeholder="Enter your first name"/>
                <div className="signup-title">Last name</div>
                <input className="signup-input" name="lastName" onChange={changeHandler} placeholder="Enter your Last name"/>
                <div className="signup-title">Email</div>
                <input className="signup-input" name="email" onChange={changeHandler} placeholder="Enter your Email "/>
                <div className="signup-title">Username</div>
                <input className="signup-input" name="username" onChange={changeHandler} placeholder="Enter your username"/>
                <div className="signup-title">Password</div>
                <input className="signup-input" name="password" onChange={changeHandler} type="password" placeholder="Enter your password"/>
                <div className="signup-title">Bio</div>
                <input className="signup-input" name="bio" onChange={changeHandler} placeholder="Enter your bio"/>
                <div className="signup-title">Profile Picture URL</div>
                <input className="signup-input" name="profilePicture" onChange={changeHandler} placeholder="Paste your profile picture Url here"/>
                <div className="signup-title">Cover Picture URL</div>
                <input className="signup-input" name="coverPicture" onChange={changeHandler} placeholder="Paste your Cover picture Url here"/>
                <button className="login-button" onClick={signupButtonPressed}>Sign Up</button>
                <div className="signup-subtext">Already have an account? <Link to="/login">Log in here!</Link></div>
            </div>
        </div>
    )
}

export default Signup
