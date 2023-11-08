import React from 'react'
import { NewsWidget, Posts, Sidebar } from '../../Components'
import "./Home.css"

function Home() {
    return (
        <div className="home">
            <Sidebar/>
            <Posts/>
            <NewsWidget/>
        </div>
    )
}

export default Home
