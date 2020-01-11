import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading, error, request, clearError} =  useHttp()
    const [post, setPost] = useState({
        title: '', text: ''
    })

    const changeHandler = event => {
        setPost({ ...post, [event.target.name]: event.target.value })
        // console.log("title", post.title);
        // console.log("body", post.text);
    }

    const getPosts = async () => {
        try {
            console.log('Posts');
            const posts = await request('/api/post/', 'GET', {...post})
            console.log('Posts', posts);
        } catch (error) {
            console.log('error'); 
        }
    }


    const createPost = async () => {
        try {
            console.log("create");
            const newPost = await request('/api/post/create', 'POST', {...post}, {
                Authorization: `Bearer ${auth.token}`
            }
            )
            //fetch('/api/post/create')
            console.log('newPost', newPost);
            
            history.push(`/detail/${newPost.post._id}`)
        } catch (error) {
            console.log("error");
        }
    }




    return (
            <div className="row">
            <div className="col s6 offset-s3">
                <h1>Create Page</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Создать</span>
                        <div>

                        </div>
                    </div>
                    <div className="card-action">
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="title"
                                    type="text"
                                    className="validate"
                                    name="title"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="text"
                                    type="text"
                                    className="validate"
                                    name="text"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="text">Body</label>
                            </div>
                        </div>



                        <button 
                        className="btn yellow darken-4"
                        disabled={loading}
                        onClick={createPost}
                        >
                            Создать
                            </button>


                    </div>
                </div>
            </div>

        </div>
       
    )
} 