import React,{useEffect} from 'react'
import AddPosts from '../AddPosts/AddPosts'
import PostsList from '../PostsList/PostsList'
import {useSelector,useDispatch} from 'react-redux'
import './Posts.css'
import { loadPosts } from '../../Pages/Post/postsSlice'
import { BlockReserveLoading } from 'react-loadingg'

function Posts() {

    const dispatch = useDispatch()
    const {status,posts,error} = useSelector(state =>state.post)

    
    useEffect(()=>{
        if(status === "idle"){
            dispatch(loadPosts())
        }
    },[status,dispatch])
    
    return (
        <div className="posts">
            <AddPosts/>
            {status === "loading" && <BlockReserveLoading color="purple"/>}
            {status === "error" && <div>Some error in loading: {error}</div>}
            {status ==="fulfilled" && posts.map(post =>{
                return <div key={post._id}><PostsList post={post}/></div>
            })}
        </div>
    )
}

export default Posts
