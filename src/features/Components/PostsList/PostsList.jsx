import React, { useState } from 'react'
import './PostsList.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import {useDispatch,useSelector} from 'react-redux'
import {likePost,dislikePost,addComment} from '../../Pages/Post/postsSlice'
import axios from 'axios'
import {Link} from "react-router-dom"
import CommentIcon from '@material-ui/icons/Comment'

function PostsList({post}) {
    const {user,token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [showComments,setshowComments] = useState(false)
    let newComment

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

    const commentButtonPressed = () =>{
        dispatch(addComment({post:post.post,newComment:{comment:newComment,name:user.name,username:user.username,profilePicture:user.profilePicture}}))
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
                <div className="stats-container">
                    <div className="like-count">{post.likes.length} Likes</div>
                    <div className="comments-count">{post.comments.length} Comments</div>
                </div>
                <div className="actions-container">
                    <div onClick={()=>likeButtonPressed(post)} className="post-like">
                        <FavoriteBorderIcon/>
                        <div>Like</div>
                    </div>
                    <div onClick={()=>setshowComments(toggle => !toggle)} className="post-comment">
                        <CommentIcon/>
                        <div>Comment</div>
                    </div>
                </div>
                {showComments && <div className="comments-container">
                    {post.comments.map(c => <div>
                        <div>{c.name}</div>
                        <div>{c.comment}</div>
                        </div>)}
                    <input onChange={e => newComment = e.target.value} placeholder="Your comment here"/>
                    <button onClick={()=>commentButtonPressed()}>Comment</button>
                </div>}
            </div>
        </div>
    )
}

export default PostsList
