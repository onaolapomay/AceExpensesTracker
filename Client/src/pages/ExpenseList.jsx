import React, { useEffect, useState } from 'react'

function ExpenseList() {

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [editingExpense, setEditingExpense] = useState(null)

  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  })

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

  if (loading) {
    return <p>Loading...</p>
  }

  function startEdit(expense) {

    setEditingExpense(expense._id)

    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.slice(0,10)
    })

  }

  async function handleUpdate() {

    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:5000/api/expenses/${editingExpense}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })

    const updated = await response.json()

    setExpenses(expenses.map(exp =>
      exp._id === editingExpense ? updated : exp
    ))

    setEditingExpense(null)

  }

  async function handleDelete() {

    const token = localStorage.getItem('token')

    await fetch(`http://localhost:5000/api/expenses/${deleteTarget}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setExpenses(expenses.filter(exp => exp._id !== deleteTarget))
    setDeleteTarget(null)

  }

  return (

    <div className='space-y-4'>

      {editingExpense && (

        <div className='bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-2 md:items-center'>

          <input
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            className='border p-2 rounded w-full md:w-auto'
          />

          <input
            value={form.amount}
            onChange={(e) => setForm({...form, amount: e.target.value})}
            className='border p-2 rounded w-full md:w-auto'
          />

          <button
            onClick={handleUpdate}
            className='bg-blue-500 text-white px-4 py-2 rounded'
          >
            Save
          </button>

        </div>

      )}

      {deleteTarget && (

        <div className='bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between gap-3'>

          <p className='text-sm'>Do you really want to delete this expense?</p>

          <div className='flex gap-2'>

            <button
              onClick={handleDelete}
              className='bg-red-500 text-white px-3 py-1 rounded'
            >
              Yes
            </button>

            <button
              onClick={() => setDeleteTarget(null)}
              className='bg-gray-400 text-white px-3 py-1 rounded'
            >
              No
            </button>

          </div>

        </div>

      )}

      <div className='space-y-3'>

        {expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          expenses.map((expense) => (

            <div
              key={expense._id}
              className='bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3'
            >

              <div>
                <p className='font-semibold'>{expense.title}</p>
                <p className='text-sm text-gray-500'>{expense.category}</p>
                <p className='text-sm text-gray-400'>
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>

              <div className='flex items-center gap-4'>

                <div className='font-bold text-purple-600'>
                  ₦{expense.amount}
                </div>

                <button
                  onClick={() => startEdit(expense)}
                  className='text-blue-500 text-sm'
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteTarget(expense._id)}
                  className='text-red-500 text-sm'
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>

  )

}

export default ExpenseList