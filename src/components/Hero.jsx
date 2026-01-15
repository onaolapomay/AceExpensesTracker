import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
    return (
        <motion.section initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut'}} 
        className='px-6 max-w-5xl py-24 mx-auto'>
            <div className='max-w-3xl'>
                <h1 className='text-5xl font-bold text-slate-700 leading-tight'>
                    Track your expenses <br />
                    Control your money
                </h1>

                <p className='mt-6 text-lg text-slate-500'>
                    Ace Expense Tracker hekps you monitor your daily habits spending, you get to understand your habits, and make smarter financial decisions- all in one trusted place
                </p>

                <div className='mt-5 flex gap-3'>
                    <button className='px-6 py-3 rounded-lg bg-black text-white
                    font-medium hover:bg-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black'>
                        Get Started
                    </button>

                    <button className='px-6 py-3 rounded-lg border border-gray-300 text-slate-600 hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'>
                        Learn more       
                    </button>

                </div>
            </div>
        </motion.section>
    );
}


export default Hero;