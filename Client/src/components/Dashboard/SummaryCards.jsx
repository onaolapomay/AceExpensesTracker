import React from 'react';


function SummaryCards () {

    const stats = [
        { label: 'total Spending', value: '47,000'},
        { label: 'Monthly Budget', value: '5,000' },
        { label: 'Transactions', value: '10' },
    ]

    return (
        <div className='grid gap-4 sm:grid-col-2 lg:grid-cols-3'>
            {stats.map((item, index)=>(
                <div key={index} className='bg-white rounded-xl shadow-sm p-5'>
                    <p className='text-sm text-slate-500'>{item.label}</p>
                    <h3 className='text-xl font-semibold text-slate-800'>{item.value}</h3>
                </div>
            ))}
        </div>
    )
}


export default SummaryCards;