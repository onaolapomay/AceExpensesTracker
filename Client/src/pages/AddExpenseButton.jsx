import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddExpenseButton() {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {

    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      console.log('No token found')
      return
    }

    setLoading(true)

    try {

      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
          date
        })
      })

      const data = await response.json()

      console.log('Expense added:', data)

      setTitle('')
      setAmount('')
      setCategory('')
      setDate('')

      navigate('/dashboard')

    } catch (error) {

      console.error('Error while adding expense:', error)

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className='max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md'>

      <h2 className='text-2xl font-bold mb-6'>Add Expense</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>

        <div>
          <label className='block mb-1 text-sm'>Title</label>

          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='e.g. Uber ride'
            required
          />

        </div>

        <div>
          <label className='block mb-1 text-sm'>Amount</label>

          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Enter amount'
            required
          />

        </div>

        <div>

          <label className='block mb-1 text-sm'>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
          >

            <option value=''>Select Category</option>
            <option value='Food'>Food</option>
            <option value='Transportation'>Transportation</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Utilities'>Utilities</option>
            <option value='Healthcare'>Healthcare</option>
            <option value='Bills'>Bills</option>
            <option value='Shopping'>Shopping</option>

          </select>

        </div>

        <div>

          <label className='block mb-1 text-sm'>Date</label>

          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
          />

        </div>

        <div className='flex gap-3'>

          <button
            type='submit'
            disabled={loading}
            className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition'
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>

          <button
            type='button'
            onClick={() => navigate('/dashboard')}
            className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition'
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  )

}

export default AddExpenseButton