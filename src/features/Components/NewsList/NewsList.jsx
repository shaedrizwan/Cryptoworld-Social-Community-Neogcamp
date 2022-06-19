import React from 'react'
import "./NewsList.css"

function NewsList({heading,link,source,url}) {
    return (
        <div key={url} className="news-list">
            <div className="news-heading">{heading}</div>
            <div className="news-subcontainer">
            <a href={link} className="news-link" target="_blank" rel="noreferrer">Read more</a>
            <div className="news-source">{source}</div>
            </div>
        </div>
    )
}

export default NewsList
