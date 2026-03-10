import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import ProtectedRoute from './Routes/ProtectedRoute'
import ProtectedTest from './pages/ProtectedTest'
import AddExpenseButton from './pages/AddExpenseButton'
import Layout from './layout/Layout'
import ExpenseList from './pages/ExpenseList'
import ExpenseChart from './components/Dashboard/ExpenseChart'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />


        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>

          <Route path="dashboard" element={<Dashboard /> } />
          <Route path="expenses" element={<ExpenseList/> } />
          <Route path="add-expense" element={<AddExpenseButton /> } />
          <Route path="chart" element={<ExpenseChart />} />
          <Route path="protected-test" element={<ProtectedTest/>} />

        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
