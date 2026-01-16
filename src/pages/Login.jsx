import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

    if (email && password) {
        navigate('/dashboard');
    }
}

return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 px-4'>
        <div className='w-full max-w-md text-center bg-white p-8 rounded-2xl shadow-sm'>

            <h1 className='text-2xl font-bold text-slate-900 mb-2'> Welcome back</h1>
            <p className='text-gray-500 mb-6'>Sign in to your account <span 
            onClick={() => navigate('/signup')}
            className='text-indigo-600 cursor-pointer'>Sign up</span></p>


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
                   border-red-500 py-2
                    text-slate-900
                     focus:outline-none
                      focus:border-red-600' required
                 />

                 <label className='absolute left-0 top-2 font-mono font-semibold text-gray-400 text-sm transition-all
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
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='peer w-full
                    font-mono font-semibold
                    bg-transparent border-b
                  border-red-500 py-2
                  text-slate-900
                    focus:outline-none 
                    focus:border-red-600' required
                />

                <label className='absolute left-0 top-2
                 font-mono font-semibold text-gray-400 text-sm transition-all
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
            className='w-full mt-8 bg-indigo-600 text-white py-2 hover:bg-indigo-700 active:*:scale-[0.98] transition rounded-xl font-medium'>
                Login
            </button>
        </form>
        </div>

    </div>
)
}


export default Login;