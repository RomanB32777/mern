import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { PostBody } from '../components/PostBody'

export const DetailPage = () => {
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [post, setPost] = useState(null)
    const postId = useParams().id

    const getPost = useCallback( async () => {
        try {
            const fetched = await request(`/api/post/${postId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log("load post", fetched);          
            setPost(fetched)
        } catch (error) {
            
        }
    }, [token, postId, request])


    useEffect( () => {
        console.log("getPostT");       
        getPost()
    }, [getPost])

    if (loading)
    {
        return <Loader/>
    }
    return (
        <div>
            { !loading && post && <PostBody post={post} />}
       
        </div>
    )
} 