// связь со сервером
import {
    useState,
    useCallback
} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => { // когда принимаем body, то приводится к строке
        console.log("req");
        
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body) // для преобразования объектов в JSON
                headers['Content-Type'] = 'application/json' // показать, что мы явно передаем json
            }
            const res = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Что-то не так')
            }
            setLoading(false)
            return data

        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null),[])
     

    return {
        loading,
        request,
        error,
        setError,
        clearError
    }
}