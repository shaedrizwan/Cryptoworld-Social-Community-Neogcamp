import React from 'react'
import {useSelector} from "react-redux"
import './Profile.css'

function Profile() {
    const {user} = useSelector(state => state.auth)
    const {posts} = useSelector(state => state.post)
    console.log(posts)
    return (
        <div className="profile">
            <img style={{width:"100%",height:"250px"}} src={user.coverPicture} alt="bitcoin-cover"/>
            <div className="profile-main">
                <img style={{width:"200px",height:"200px",borderRadius:"50%",position:"relative",bottom:"80px",marginBottom:"-50px"}} src={user.profilePicture} alt="bitcoin-cover"/>
                <div className="profile-name">{user.firstName} {user.lastName}</div> 
                <div className="profile-username">@{user.username}</div>
                <div className="profile-bio">{user.bio}</div>
            </div>
        </div>
    )
}

export default Profile
