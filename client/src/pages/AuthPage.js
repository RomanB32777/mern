import React, {useState, useEffect, useContext} from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} =  useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

useEffect(() => {
message(error)
clearError()
}, [error, message, clearError]) // если есть ошибка

const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
}


const registerHandler = async () => {
    try {
        const data = await request('/api/auth/register', 'POST', {...form})
        console.log('Data', data);
        
    } catch (e) {
        
    }
}


const loginHandler = async () => {
    try {
        const data = await request('/api/auth/login', 'POST', {...form})
        console.log('Data', data);
        auth.login(data.token, data.userId)
    } catch (e) {
        
    }
}

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Auth Page</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                        </div>
                    </div>
                    <div className="card-action">
                        <div className="row">
                            <div className="input-field col s6">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s6">
                                <input
                                    id="password"
                                    type="password"
                                    className="validate"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>



                        <button 
                        className="btn yellow darken-4"
                        disabled={loading}
                        onClick={loginHandler}
                        >
                            Войти
                            </button>
                        <button 
                        className="btn grey lighten-1 black-text"
                        onClick={registerHandler}
                        disabled={loading}
                        >
                            Регистрация
                            </button>

                    </div>
                </div>
            </div>

        </div>
    )
} 