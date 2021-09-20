import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux"
import './Sidebar.css'

function Sidebar() {
    const {user} = useSelector(state => state.auth)
    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <img  style={{borderRadius:"50%",width:"100px",height:"100px"}} className="sidebar-profile-image" src={user.profilePicture} alt="profile"/>
                <div className="sidebar-profile-name">{user.name}</div>
                <div className="sidebar-profile-username">@{user.username}</div>
                <div className="sidebar-profile-bio">{user.bio}</div>
                <div className="sidebar-profile-email">{user.email}</div>
                <Link to={`/profile/${user.username}`} className="profile-button">View Profile</Link>
            </div>
        </div>
    )
}

export default Sidebar
