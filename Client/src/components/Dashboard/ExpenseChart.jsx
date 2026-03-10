import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function ExpenseChart({ expenses }) {

  const categoryTotals = {}

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0
    }
    categoryTotals[exp.category] += exp.amount
  })

  const data = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category]
  }))

  const colors = [
    '#6366F1',
    '#22C55E',
    '#F59E0B',
    '#EF4444',
    '#06B6D4'
  ]

  return (

    <div className='bg-white p-4 rounded-lg shadow'>

      <h2 className='font-semibold mb-4'>Expenses by Category</h2>

      <div className='h-64'>

        <ResponsiveContainer width='100%' height='100%'>

          <PieChart>

            <Pie
              data={data}
              dataKey='value'
              nameKey='name'
              outerRadius={80}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

export default ExpenseChart