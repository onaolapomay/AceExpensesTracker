import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const navigate = useNavigate()


    const { login } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

    if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || 'Login failed')
            setLoading(false)
            return
        }

        
        login(data.user)
        navigate('/dashboard');
    } catch (err) {
        setError('An error occurred during login');
    } finally {
        setLoading(false);
    }
}

return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 px-4'>
        <div className='w-full max-w-md text-center bg-white p-8 rounded-2xl shadow-sm'>

            <h1 className='text-2xl font-bold text-slate-900 mb-2'> Welcome back</h1>
            <p className='text-gray-500 mb-6'>Sign in to your account <span 
            onClick={() => navigate('/signup')}
                className='text-indigo-600 cursor-pointer'>Sign up</span>
            </p>

            {error && (
                <p className='mb-4 text-red-600 font-semibold text-sm'>{error}</p>
            )}


        <form onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold mb-6 text-center'>
                Login
            </h2>
            <div className='relative mb-6'>
               <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='peer
                 w-full font-mono font-semibold
                  bg-transparent border-b
                   border-red-500 pt-6 pb-2
                    text-slate-900
                     focus:outline-none
                      focus:border-red-600' required
                 />

                 <label className='absolute left-0 top-2 font-mono font-semibold text-gray-400 text-sm transition-all duration-200 ease-out
                 peer-placeholder-shown:top-2
                 peer-placeholder-shown:text-slate-400
                 peer-placeholder-shown:text-sm
                 peer-focus:-top-3
                 peer-focus:text-red-600
                 peer-focus:text-sm
                 '>
                    Email Address
                 </label>


                 <span className='absolute left-0 bottom-0.5 h-0 w-0
                 bg-slate-600 transition-all duration-300 peer-focus:w-full'>
                 </span>
            </div>

            <div className='mb-6 relative'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='peer w-full
                    font-mono font-semibold
                    bg-transparent border-b
                  border-red-500 pt-6 pb-2
                  text-slate-900
                    focus:outline-none 
                    focus:border-red-600' required
                />
                
                    <button type='button' onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-0 top-2 text-sm font-semibold text-red-600 hover:text-red-700 transition'>
                            {showPassword ? 'hide' : 'show'}
                    </button>

                <label className='absolute left-0 top-2
                 font-mono font-semibold text-gray-400 text-sm transition-all duration-200 ease-out
                 peer-placeholder-shown:top-2 
                 peer-placeholder-shown:text-slate-400
                 peer-placeholder-shown:text-sm
                 peer-focus:-top-3
                 peer-focus:text-red-600
                 peer-focus:text-sm
                 '>
                    Password
                 </label>


                 <span className='absolute left-0 bottom-0.5 h-0 w-0
                 bg-slate-600 transition-all duration-300 peer-focus:w-full'>
                 </span>
            </div>
            



            <button
            type='submit'
            disabled={loading}
            className='w-full mt-8 bg-indigo-600 text-white py-2 hover:bg-indigo-700 active:*:scale-[0.98] transition rounded-xl font-medium'>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
        </div>

    </div>
)
}


export default Login;