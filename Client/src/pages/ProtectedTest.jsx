import { useEffect, useState } from 'react'
import { authFetch } from '../utils/authFetch'

function ProtectedTest() {
    const [message, setMessage] = useState('')

    const API_URL = "https://aceexpensestracker.onrender.com"

    useEffect(() => {
        async function fetchData() {
            const res = await authFetch(`${API_URL}/api/protected`)
            const data = await res.json()
            setMessage(data.message)
        }

        fetchData()
    },[])

    return <h1>{message}</h1>
}

export default ProtectedTest;