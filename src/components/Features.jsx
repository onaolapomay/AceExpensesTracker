import React from 'react';

function Features() {
    const features =[
        {
            title: "Track Expenses",
            description: "Log your daily habit expenses and monitor where the money goes."
        },
        {
            title: "Visual Insight",
            description: "understand your spending with clear summaries and stats"
        },
        {
            title: "Secure Access",
            description: "Your data is safe and protected with secure authentication"
        }
    ]
    return (
        <section className='px-6 py-20 bg-slate-50'>
            <div className='max-w-xl mx-auto'>
                <h2 className='text-3xl font-bold text-slate-900 text-center'>
                    Why use Ace Expense Tracker?
                </h2>

                <div className='mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {features.map((item, index) =>(
                        <div key={index} className='bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition'>
                            <h3 className='text-xl font-semibold text-slate-900'>
                                {item.title}
                            </h3>

                            <p className='mt-3 text-slate-600'>
                                {item.description}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}


export default Features;