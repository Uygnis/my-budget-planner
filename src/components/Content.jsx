import React, { useRef, useState } from 'react'
import Button from './Button'

const Content = ({ setSpending }) => {
  const nameInput = useRef()
  const costInput = useRef()
  const searchInput = useRef()
  const [search, setSearch] = useState('')
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('items') || '[]'))
  const addNew = () => {
    const name = nameInput.current.value
    const cost = costInput.current.value
    if (name === '' || cost <= 0) {
      return
    }
    const items = JSON.parse(localStorage.getItem('items') || '[]')
    const item = { id: expenses.length, name, cost }
    items.push(item)
    localStorage.setItem('items', JSON.stringify(items))
    setExpenses([...expenses, { id: expenses.length, name, cost }])
    nameInput.current.value = ''
    costInput.current.value = ''
  }
  const calculateCosts = () => {
    const items = JSON.parse(localStorage.getItem('items') || '[]')
    const total = items.reduce((acc, curr) => acc + parseInt(curr.cost), 0)
    console.log(total)
    localStorage.setItem('spending', total)
    setSpending(total)
    return total
  }
  const deleteItem = (e, id) => {
    console.log(`delete ${id}`)
    const items = JSON.parse(localStorage.getItem('items') || '[]')
    const newItems = items.filter(item => item.id !== id)
    localStorage.setItem('items', JSON.stringify(newItems))
    setExpenses(expenses.filter(item => item.id !== id))
    calculateCosts()

  }
  return (
    <div>
      <h2 className='text-2xl text-gray-700 font-bold mb-5'>Expenses</h2>
      <input type='text' ref={searchInput} placeholder='Type to search...' className='w-full border p-2 mb-4' onChange={e => setSearch(e.target.value)} />
      <ul>
        {expenses.filter(expense => expense.name.toLowerCase().includes((search).toLowerCase())).map(expense => (
          <li key={expense.id} className='flex justify-between p-4 border'><div>{expense.name}</div><div className='flex gap-2'><div className='border px-2 rounded-full bg-sky-400 text-white'>${expense.cost}</div><Button onClick={e => deleteItem(e, expense.id)} text='Delete' /></div></li>
        ))}

      </ul>



      <h2 className='text-2xl text-gray-700 font-bold mb-5'>Add Expense</h2>
      <div className='flex gap-4 '>
        <div> <p>Name:</p>
          <input type='text' ref={nameInput} className='bg-slate-100 p-2 w-full rounded ' /></div>
        <div> <p>Cost:</p>
          <input type='number' ref={costInput} className='bg-slate-100 p-2 w-full rounded' />
        </div></div>
      <div className='mt-3'>
        <Button text='Save' onClick={() => { addNew(); calculateCosts() }} className='btn' />
      </div>



    </div>
  )
}

export default Content