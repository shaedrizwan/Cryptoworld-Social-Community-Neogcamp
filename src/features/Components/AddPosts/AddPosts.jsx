import React from 'react'
import { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { addPost } from '../../Pages/Post/postsSlice'
import './AddPosts.css'
import {v4 as uuid} from 'uuid'

function AddPosts() {
    const [data,setData] = useState('')
    const dispatch = useDispatch()
    const {user,token} = useSelector(state => state.auth)

    const postButtonPressed = async () =>{
        try{
            const response = await axios.post('https://cryptoworld-backend.herokuapp.com/post/add',{
                post:data,
            },{
                headers:{
                    authorization: token
                }
            })
            const id = uuid()
            const name = `${user.firstName} ${user.lastName}`
            dispatch(addPost({_id:id,post:data,name:name,username:user.username,profilePicture:user.profilePicture,likes:[]}))
            setData("")
        }catch(err){
            console.log(err.message)
        }
    }

    return (
        <div className="add-posts">
            <div className="post-title">What's on your Mind?</div>
            <input className="post-input" type="text" value={data} onChange={(e)=>setData(e.target.value)} placeholder="Share to the community"/>
            <button className="post-submit" onClick={()=>postButtonPressed()}>Post</button>
        </div>
    )
}
 
export default AddPosts
