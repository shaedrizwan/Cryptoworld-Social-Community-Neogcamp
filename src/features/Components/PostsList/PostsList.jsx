import React from 'react'
import './PostsList.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {useDispatch,useSelector} from 'react-redux'
import {likePost,dislikePost} from '../../Pages/Post/postsSlice'
import axios from 'axios'
import {Link} from "react-router-dom"

function PostsList({post}) {
    const {user,token} = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const likeButtonPressed = async (post) =>{
        const userId = user._id
        const isLiked = post.likes.find(id => id === userId)
        if(isLiked){
            dispatch(dislikePost({post,userId}))
        }
        else{
            dispatch(likePost({post,userId}))
        }
        const response = await axios.post('https://cryptoworld-social.herokuapp.com/post/likePost',{
            postId:post._id
        },{
            headers:{
                authorization:token
            }
        })
    }

    return (
        <div className="posts-list">
            <div className="posts-dp">
                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src={post.profilePicture} alt={post.username}/>
            </div> 
            <div className="posts-content">
                <Link to={`/profile/${post.username}`} className="post-name">{post.name}</Link>
                <Link to={`/profile/${post.username}`} className="post-username">{post.username}</Link>
                <div className="post-details">{post.post}</div>
                <div className="like-count">{post.likes.length} Likes</div>
                <div onClick={()=>likeButtonPressed(post)} className="post-like">
                    <FavoriteBorderIcon/>
                    <div>Like</div>
                </div>
            </div>
        </div>
    )
}

export default PostsList
