import React from 'react';


function Footer() {
    return (
        <footer className='border-t py-6 px-6'>
            <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                <p className='text-sm text-slate-500'>© {new Date().getFullYear()} Expenses Tracker</p>

            </div>

        </footer>
    )
}


export default Footer