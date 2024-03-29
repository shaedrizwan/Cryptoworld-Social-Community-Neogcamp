import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useParams } from 'react-router'
import axios from "axios"
import { toast } from 'react-toastify'
import './Profile.css'
import { BlockReserveLoading } from 'react-loadingg';
import CreateIcon from '@material-ui/icons/Create';
import {updateName,updateBio,addFollowing,removeFollowing} from "../../Auth/authSlice"
import {updatePostName} from "../Post/postsSlice"
import {Link} from "react-router-dom"

function Profile() {
    const {user,token} = useSelector(state => state.auth)
    const {username} = useParams()
    const [userProfile,setUserProfile] = useState(null)
    const isUser = username === user.username
    const [popup,setPopup] = useState({name:false,bio:false,followers:false,following:false})
    const [isFollowing,setIsFollowing] = useState(false)
    let newName,newBio
    const dispatch = useDispatch()


    useEffect(()=>{
        (
            async function(){
                try{
                    const response = await axios.post('https://cryptoworld-social.herokuapp.com/user/profile',{
                        username:username
                    },{
                        headers:{
                            authorization:token
                        }
                    })
                    if(response.status === 200){
                        setUserProfile(response.data.user)
                    }
                }catch{
                    toast.error("Failed to get the profile details",{
                        position:toast.POSITION.BOTTOM_RIGHT
                    })
                }
            }
        )()
    },[username])

    useEffect(()=>{
        if(userProfile){
            const following = userProfile.followers.find(follower => follower.username === user.username)
            if(following){
                setIsFollowing(true)
            }
        }
    },[userProfile])

    const nameUpdatePressed = async() =>{
        const response = await axios.post("https://cryptoworld-social.herokuapp.com/user/updateName",{
            newName:newName
        },{
            headers:{
                authorization:token
            }
        })
        if(response.status === 200){
            dispatch(updateName(newName))
            dispatch(updatePostName({oldName:user.name,newName:newName}))
            toast.success("Name updated successfully",{
                autoClose:3000,
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const bioUpdatePressed = async() =>{
        const response = await axios.post("https://cryptoworld-social.herokuapp.com/user/updateBio",{
            newBio:newBio
        },{
            headers:{
                authorization:token
            }
        })
        if(response.status === 200){
            dispatch(updateBio(newBio))
            toast.success("Bio updated successfully",{
                autoClose:3000,
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    const FollowButtonPressed = async() =>{
        const response = await axios.post("https://cryptoworld-social.herokuapp.com/user/updateFollow",{
            followUserId:userProfile._id
        },{
            headers:{
                authorization:token
            }
        })
        if(response.status === 200){
            if(isFollowing){
                setIsFollowing(false)
                setUserProfile({...userProfile,followers:userProfile.followers.filter(follower => follower.username !== user.username)})
                dispatch(removeFollowing({name:userProfile.name,username:userProfile.username,profilePicture:userProfile.profilePicture}))
            }else{
                setIsFollowing(true)
                setUserProfile({...userProfile,followers:[...userProfile.followers,{name:user.name,username:user.username,profilePicture:user.profilePicture}]})
                dispatch(addFollowing({name:userProfile.name,username:userProfile.username,profilePicture:userProfile.profilePicture}))
            }
        }
    }

    return (
        <div className="profile">
            {!userProfile && <BlockReserveLoading/>}
            {userProfile && 
            <>
            <img style={{width:"100%",height:"250px"}} src={userProfile.coverPicture} alt="bitcoin-cover"/>
            <div className="profile-main">
                <img style={{width:"200px",height:"200px",borderRadius:"50%",position:"relative",bottom:"80px",marginBottom:"-50px"}} src={userProfile.profilePicture} alt="bitcoin-cover"/>
                <div className="profile-name">{userProfile.name} {isUser && <CreateIcon onClick={()=>setPopup({...popup,name:!popup.name})} fontSize="small"/>}</div>
                {popup.name && <div className="update-name-container">
                    <div onClick={()=>setPopup({...popup,name:false})} className="update-name-close">x</div>
                    <div>Enter new name</div>
                    <input type="text" onChange={e => newName=e.target.value} placeholder="Enter new name"/>
                    <button onClick={()=>nameUpdatePressed()}>Update</button>
                    </div>}
                <div className="profile-username">@{userProfile.username}</div>
                <div className="follow-stats">
                    <div onClick={()=> setPopup({...popup,followers:!popup.followers})} className="follow-stats-item">{userProfile.followers.length} Followers</div>
                    {popup.followers && <div className="followers-container">
                            <div className="follow-container-close" onClick={()=> setPopup({...popup,followers:false})}>X</div>
                            {userProfile.followers.length === 0 && <div>{userProfile.name} does not have any followers</div>}
                            {userProfile.followers.length !== 0 && userProfile.followers.map(profile => <div className="follow-list-wrap">
                            <div className="profile-dp">
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src={profile.profilePicture} alt={profile.username}/>
                            </div>
                            <div className="follow-list-content">
                                <Link onClick={()=> setPopup({...popup,followers:!popup.followers})} to={`/profile/${profile.username}`} className="follow-list-name">{profile.name}</Link>
                                <Link onClick={()=> setPopup({...popup,followers:!popup.followers})} to={`/profile/${profile.username}`} className="follow-list-username">{profile.username}</Link>
                            </div>
                            </div>)}
                        </div>}
                    <div onClick={()=> setPopup({...popup,following:!popup.following})} className="follow-stats-item">{userProfile.following.length} Following</div>
                    {popup.following && <div className="followers-container">
                            <div className="follow-container-close" onClick={()=> setPopup({...popup,following:false})}>X</div>
                            {userProfile.following.length === 0 && <div>{userProfile.name} does not follow anyone</div>}
                            {userProfile.following.length !== 0 && userProfile.following.map(profile => <div className="follow-list-wrap">
                            <div className="profile-dp">
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src={profile.profilePicture} alt={profile.username}/>
                            </div>
                            <div className="follow-list-content">
                                <Link onClick={()=> setPopup({...popup,following:!popup.following})} to={`/profile/${profile.username}`} className="follow-list-name">{profile.name}</Link>
                                <Link onClick={()=> setPopup({...popup,following:!popup.following})} to={`/profile/${profile.username}`} className="follow-list-username">{profile.username}</Link>
                            </div>
                            </div>)}
                        </div>}
                </div>
                {!isUser && <button className={isFollowing?"primary-button":"secondary-button"} onClick={()=>FollowButtonPressed()}>{isFollowing?"Following":"Follow"}</button>}
                <div className="profile-bio">{userProfile.bio} {isUser && <CreateIcon onClick={()=>setPopup({...popup,bio:!popup.bio})} fontSize="small"/>}</div>
                {popup.bio && <div className="update-name-container">
                    <div onClick={()=>setPopup({...popup,bio:false})} className="update-name-close">x</div>
                    <div>Enter new Bio</div>
                    <input type="text" onChange={e => newBio=e.target.value} placeholder="Enter new bio"/>
                    <button onClick={()=>bioUpdatePressed()}>Update</button>
                    </div>}
            </div>
            </>
            }
        </div>
    )
}

export default Profile
