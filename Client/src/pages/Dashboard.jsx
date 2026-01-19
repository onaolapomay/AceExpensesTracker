import React from 'react'
import SummaryCards from '../components/Dashboard/SummaryCards'
import ExpenseList from '../components/Dashboard/ExpenseList'




function Dashboard() {

    return (
        <div className='min-h-screen flex bg-slate-100'>

            {/* sidebar */}

            <aside className='w-64 bg-neutral-800 text-white hidden md:flex flex-col p-6'>
                <h2 className='text-2xl font-bold mb-6'>Ace Tracker</h2>

                <nav className='space-y-4'>
                    <button className='text-left w-full hover:text-indigo-400 transition'>
                        Dashboard
                    </button>

                    <button className='text-left w-full hover:text-indigo-400 transition'>
                        Expenses
                    </button>

                    <button className='text-left w-full hover:text-indigo-400 transition'>
                        Add Expenses 
                    </button>

                    <button className='text-left w-full hover:text-indigo-400 transition'>
                        Setings
                    </button>
                </nav>
            </aside>


            <div className='flex-1 flex flex-col'>
                <header className='h-16 bg-white shadow-sm flex items-center justify-between px-6'>
                    <h1 className='text-xl font-semibold text-slate-800'>Dashboard</h1>

                    <div className='text-sm text-slate-600'>
                        User
                    </div>
                </header>

                <main className='flex-1 p-6'>
                    <SummaryCards />
                    <ExpenseList />

                </main>

            </div>

            
        </div>
    )
}


export default Dashboard