import React from 'react'
import { useEffect } from 'react'
import NewsList from '../NewsList/NewsList'
import "./NewsWidget.css"
import { useSelector,useDispatch } from 'react-redux'
import {loadNews} from '../../newsSlice'

function NewsWidget() {
    const {news,status,error} = useSelector(state => state.news)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(status === 'idle'){
            dispatch(loadNews())
        }
    },[status,dispatch])

    return (
        <div className="news-widget">
            <div className="news-container">
                <div className="news-title">Trending News</div>
                {status === "loading" && <div>News Loading...</div>}
                {status === "fulfilled" && news.filter((item,idx)=>idx <4 ).map(({title,url,source}) =>{
                    return <NewsList key={url} heading={title} link={url} source={source} />
                })}
                {status === "error" && <div>Some error occured: {error}</div>}
            </div>
        </div>
    )
}

export default NewsWidget