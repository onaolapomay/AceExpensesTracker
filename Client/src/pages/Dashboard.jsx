import React, { useEffect, useState } from 'react'
import ExpenseChart from '../components/Dashboard/ExpenseChart'

function Dashboard() {

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchExpenses() {

      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      setExpenses(Array.isArray(data) ? data : [])
      setLoading(false)

    }

    fetchExpenses()

  }, [])

  const totalExpenses = expenses.length

  const totalAmount = expenses.reduce((total, expense) => {
    return total + expense.amount
  }, 0)

  const recentExpenses = expenses.slice(0, 5)

  if (loading) {
    return <p>Loading...</p>
  }

  return (

    <div className='space-y-6'>

      <div className='grid md:grid-cols-2 gap-4'>

        <div className='bg-white p-6 rounded-lg shadow'>
          <p className='text-gray-500'>Total Expenses</p>
          <h2 className='text-2xl font-bold'>{totalExpenses}</h2>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <p className='text-gray-500'>Total Amount Spent</p>
          <h2 className='text-2xl font-bold'>
            ₦{totalAmount.toLocaleString()}
          </h2>
        </div>

      </div>

      <ExpenseChart expenses={expenses} />

      <div className='bg-white p-6 rounded-lg shadow'>

        <h2 className='text-lg font-semibold mb-4'>Recent Expenses</h2>

        {recentExpenses.length === 0 ? (
          <p>No recent expenses</p>
        ) : (
          <div className='space-y-3'>

            {recentExpenses.map(expense => (

              <div
                key={expense._id}
                className='flex justify-between items-center border-b pb-2'
              >

                <div>
                  <p className='font-medium'>{expense.title}</p>
                  <p className='text-sm text-gray-500'>
                    {expense.category}
                  </p>
                </div>

                <div className='font-semibold text-purple-600'>
                  ₦{expense.amount.toLocaleString()}
                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>

  )

}

export default Dashboard