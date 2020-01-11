import React from 'react'

export const PostBody = ({post}) => {
    return (
        <div>
            <h1> {post.title} </h1>
            <p> {post.text} </p>
        </div>
    )
}