import React from 'react'


function Navbar() {
    return (
        <nav className='w-full bg-white border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-6 flex items-center py-4 justify-between'>
                
                <h1 className='text-xl font-bold text-indigo-600'>
                    Ace Expenses Tracker
                </h1>

                <ul className='hidden md:flex items-center gap-8 text-yellow-700 font-semibold'>
                    <li className='hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 cursor-pointer'>Home</li>
                    <li className='hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 cursor-pointer'>Features</li>
                    <li className='hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 cursor-pointer'>Pricing</li>
                </ul>

                <div className='flex items-center gap-4'>
                    <button className='text-yellow-600 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700'>
                        Login
                    </button>
                    <button className='bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 transition'>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    )
}


export default Navbar