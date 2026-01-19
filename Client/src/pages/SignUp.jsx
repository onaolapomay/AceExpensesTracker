import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

    if (email && password && password === confirmPassword) {
        setError('All fields are required')

    }

    if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
    }

    navigate('/login')
}


    return (
        <div className='min-h-screen flex items-center justify-center bg-slate-100 px-4'>
            <div className='w-full max-w-md text-center bg-white p-8 py-20 rounded-2xl shadow-sm'>
                    <h2 className='text-3xl font-bold font-[roboto]' >Create an account</h2>
                    <p className='mb-8 text-gray-400'>
                        Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className='text-amber-400 hover:underline cursor-pointer'
              >
                Sign in
              </span>
            </p>
                <form onSubmit={handleSubmit}>
                    <div className='relative mb-4'>
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
                            type={showPassword ? "text" : "password"}
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='peer
                              w-full font-mono font-semibold
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

                            <label className='absolute left-0 top-2 font-mono font-semibold text-gray-400 text-sm transition-all duration-200 ease-out
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
                    <div className='mb-6 relative'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder=" "
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='peer
                                w-full font-mono font-semibold
                                bg-transparent border-b
                                border-red-500 pt-6 pb-2
                                text-slate-900
                                focus:outline-none
                                focus:border-red-600' required
                        />

                        <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className='absolute right-0 top-2 text-sm font-semibold text-red-600 hover:text-red-700 transition'>
                            {showConfirmPassword ? 'hide' : 'show'}
                        </button>


                        <label className='absolute left-0 top-2 font-mono font-semibold text-gray-400 text-sm transition-all duration-200 ease-out
                            peer-placeholder-shown:top-2 
                            peer-placeholder-shown:text-slate-400
                            peer-placeholder-shown:text-sm
                            peer-focus:-top-3
                            peer-focus:text-red-600
                            peer-focus:text-sm
                            '>
                            Confirm Password
                        </label>
                        <span className='absolute left-0 bottom-0.5 h-0 w-0
                            bg-slate-600 transition-all duration-300 peer-focus:w-full'>
                        </span>
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors'
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}



export default SignUp;