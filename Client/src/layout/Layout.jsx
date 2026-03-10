import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Receipt, PlusCircle, Settings, LogOut, Menu } from 'lucide-react'


function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false) 



    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <div className='min-h-screen flex bg-slate-100'>


        {sidebarOpen && (
            <div onClick={() => setSidebarOpen(false)}
            className='fixed inset-0 bg-black/40 z-30 md:hidden'>
            </div>
        )}
            <aside className={`w-64 min-h-screen bg-neutral-900 text-white flex flex-col p-6 fixed md:relative z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0':'-translate-x-full'} md:translate-x-0`}>
                <h2 className='text-2xl font-bold tracking-wide text-indigo-400 mb-6'>Ace Tracker</h2>

                <nav className='space-y-2'>
                    <NavLink to="/dashboard" end onClick={() => setSidebarOpen(false)} className={({ isActive }) =>`flex items-center gap-3 py-2 pl-3 pr-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 border-l-2 border-indigo-500' : 'hover:bg-neutral-700 hover:translate-x-1'}`}>
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink to="/expenses" onClick={() => setSidebarOpen(false)} className={({ isActive }) =>`flex items-center gap-3 py-2 pl-3 pr-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 border-l-2 border-indigo-500' : 'hover:bg-neutral-700 hover:translate-x-1'}`}>
                        <Receipt size={18} />
                        Expenses
                    </NavLink>

                    <NavLink to="/add-expense" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 py-2 pl-3 pr-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 border-l-2 border-indigo-500' : 'hover:bg-neutral-700 hover:translate-x-1'}`}>
                        <PlusCircle size={18} />
                        Add Expenses 
                    </NavLink>

                    <NavLink to="/settings" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `flex items-center gap-3 py-2 pl-3 pr-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-indigo-700 border-l-2 border-indigo-500' : 'hover:bg-neutral-700 hover:translate-x-1'}`}>
                        <Settings size={18} />
                        Settings
                    </NavLink>
                </nav>

                <button onClick={handleLogout} className='mt-auto flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-red-600 active:bg-red-600 transition-all duration-300'>
                    <LogOut size={18} />
                     Logout
                </button>
            </aside>


            <div className='flex-1 flex flex-col'>
                <header className='h-16 bg-white shadow-sm flex items-center justify-between px-6'>
                    <div className='flex items-center gap-4'>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className='md:hidden'>
                            <Menu size={20} />
                        </button>
                        <h1 className='text-xl font-semibold text-slate-800'>Dashboard</h1>
                        
                    </div>
                    <div className='text-sm text-slate-600'>
                        User
                    </div>
                </header>

                <main className='flex-1 p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}


export default Layout