import { useEffect, useState } from 'react'
import axios from 'axios'

function Settings() {

  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')
  const API = 'https://aceexpensestracker.onrender.com/api/auth'

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await axios.get(`${API}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log('USER RESPONSE:', res.data)

        setUser(res.data.user)
        setEmail(res.data.user.email)

      } catch (err) {

        console.log('ME ERROR:', err.response)

        setError('Failed to load user info')
      }

    }

    fetchUser()

  }, [])

  const updateEmail = async () => {

    setMessage(null)
    setError(null)

    if (!email) {
      setError('Email cannot be empty')
      return
    }

    try {

      const res = await axios.put(
        `${API}/update-email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUser(res.data.user)
      setMessage('Email updated successfully')

    } catch (err) {
      setError(err.response?.data?.message || 'Error updating email')
    }

  }

  const changePassword = async () => {

    setMessage(null)
    setError(null)

    if (!currentPassword || !newPassword) {
      setError('Both password fields are required')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    try {

      await axios.put(
        `${API}/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setMessage('Password changed successfully')

      setCurrentPassword('')
      setNewPassword('')

    } catch (err) {

      setError(
        err.response?.data?.message || 'Password update failed'
      )

    }

  }

  return (

    <div className='max-w-xl mx-auto p-6'>

      <h1 className='text-2xl font-bold mb-6'>Settings</h1>

      {message && (
        <div className='mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300'>
          {message}
        </div>
      )}

      {error && (
        <div className='mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300'>
          {error}
        </div>
      )}

      {user && (
        <div className='mb-8 border p-4 rounded bg-gray-50'>
          <p><strong>User ID:</strong> {user._id}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <div className='mb-8'>

        <h2 className='font-semibold mb-2'>Update Email</h2>

        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border p-2 w-full mb-3 rounded'
        />

        <button
          onClick={updateEmail}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
        >
          Update Email
        </button>

      </div>

      <div>

        <h2 className='font-semibold mb-2'>Change Password</h2>


        <div className='relative mb-3'>

          <input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder='Current password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className='border p-2 w-full rounded pr-10'
          />

          <button
            type='button'
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className='absolute right-2 top-2 text-sm'
          >
            {showCurrentPassword ? '🙈' : '👁'}
          </button>

        </div>


        <div className='relative mb-3'>

          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder='New password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='border p-2 w-full rounded pr-10'
          />

          <button
            type='button'
            onClick={() => setShowNewPassword(!showNewPassword)}
            className='absolute right-2 top-2 text-sm'
          >
            {showNewPassword ? '🙈' : '👁'}
          </button>

        </div>

        <button
          onClick={changePassword}
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
        >
          Change Password
        </button>

      </div>

    </div>

  )

}

export default Settings