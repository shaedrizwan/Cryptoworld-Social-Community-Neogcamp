import React from 'react'
import { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import { addPost } from '../../Pages/Post/postsSlice'
import './AddPosts.css'
import {v4 as uuid} from 'uuid'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BlockReserveLoading } from 'react-loadingg'

toast.configure()

function AddPosts() {
    const [data,setData] = useState('')
    const dispatch = useDispatch()
    const {user,token} = useSelector(state => state.auth)
    const [loader,setLoader] = useState(false)

    const postButtonPressed = async () =>{
        try{
            setLoader(true)
            const response = await axios.post('https://cryptoworld-social.herokuapp.com/post/add',{
                post:data,
            },{
                headers:{
                    authorization: token
                }
            })
            setLoader(false)
            toast.dark("Posted added successfully",{
                autoClose:1000,
                position:toast.POSITION.BOTTOM_RIGHT
            })
            const id = uuid()
            const name = `${user.firstName} ${user.lastName}`
            dispatch(addPost({_id:id,post:data,name:name,username:user.username,profilePicture:user.profilePicture,likes:[]}))
            setData("")
        }catch(err){
            toast.error("Failed to add post",{
                autoClose:1000,
                position:toast.POSITION.BOTTOM_RIGHT
            })
        }
    }

    return (
        <div className="add-posts">
            <div className="post-title">What's on your Mind?</div>
            <input className="post-input" type="text" value={data} onChange={(e)=>setData(e.target.value)} placeholder="Share to the community"/>
            <button className="post-submit" onClick={()=>postButtonPressed()}>Post</button>
            {loader && <BlockReserveLoading color="purple"/>}
        </div>
    )
}
 
export default AddPosts
