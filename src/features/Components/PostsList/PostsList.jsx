import React, { useState } from 'react'
import './PostsList.css'
import {useDispatch,useSelector} from 'react-redux'
import {likePost,dislikePost,addComment} from '../../Pages/Post/postsSlice'
import axios from 'axios'
import {Link} from "react-router-dom"
import CommentIcon from '@material-ui/icons/Comment'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'

function PostsList({post}) {
    const {user,token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [showComments,setshowComments] = useState(false)
    const [isLiked,setIsLiked] = useState(post.likes.find(id => id === user._id)?true:false)
    const [newComment,setNewComment] = useState("")


    const likeButtonPressed = async (post) =>{
        const userId = user._id
        if(isLiked){
            dispatch(dislikePost({post,userId}))
            setIsLiked(false)
        }
        else{
            dispatch(likePost({post,userId}))
            setIsLiked(true)
        }
        const response = await axios.post('https://cryptoworld-social.herokuapp.com/post/likePost',{
            postId:post._id
        },{
            headers:{
                authorization:token
            }
        })
    }

    const commentButtonPressed = async() =>{
        const response = await axios.post('https://cryptoworld-social.herokuapp.com/post/addComment',{
            postId:post._id,
            comment:newComment
        },{
            headers:{
                authorization:token
            }
        })
        dispatch(addComment({post:post.post,newComment:{comment:newComment,name:user.name,username:user.username,profilePicture:user.profilePicture}}))
        setNewComment("")
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
                        <ThumbUpAltIcon className={isLiked?"like-colored":"like-uncolored"} />
                        <div>{isLiked?"Liked":"Like"}</div>
                    </div>
                    <div onClick={()=>setshowComments(toggle => !toggle)} className="post-comment">
                        <CommentIcon/>
                        <div>Comment</div>
                    </div>
                </div>
                {showComments && <div className="comments-container">
                    <div className="comments-title">Comments</div>
                    {post.comments.map(c => <div className="comment-wrap">
                        <div className="posts-dp">
                            <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={c.profilePicture} alt={c.username}/>
                        </div>
                        <div className="posts-content">
                            <Link to={`/profile/${c.username}`} className="comment-name">{c.name}</Link>
                            <Link to={`/profile/${c.username}`} className="comment-username">{c.username}</Link>
                            <div className="comment">{c.comment}</div>
                        </div>
                        </div>)}
                    <input className="comment-input" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Your comment here"/>
                    <button className="comment-submit" onClick={()=>commentButtonPressed()}>Comment</button>
                </div>}
            </div>
        </div>
    )
}

export default PostsList
