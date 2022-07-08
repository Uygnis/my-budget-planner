import React, { useState, useRef } from 'react'
import { useLocalStorage } from "./useLocalStorage";
import Button from './Button'
import Content from './Content';
const Header = () => {
    const [toggle, setToggle] = useState('Edit')
    const [budget, setBudget] = useLocalStorage("budget", "0")
    const [spending, setSpending] = useLocalStorage("spending", "0")
   
    const inputBudget = useRef()

    const handleClick = () => {
        if (toggle === 'Edit') {
            setToggle('Save')
            inputBudget.current.value = ''
        }
        else {
            setToggle('Edit')
        }
    }
    return (

        <div>
            <h1 className="text-3xl text-gray-700 font-bold mb-5">
                My Budget Planner
            </h1>
            <div className="flex justify-between gap-4 ">
                <div className="flex justify-between items-center bg-slate-200 p-4 w-56 rounded">
                    <p className="text-slate-600">
                        Budget: <span className={toggle !== 'Save' ? "" : "hidden"}>${budget}</span>
                    </p>
                    <input type="text" ref={inputBudget} className={toggle === 'Save' ? "bg-slate-100 w-full m-1 " : " hidden"} onChange={e => setBudget(e.target.value)} />
                    <Button text={toggle} className='btn' onClick={handleClick} />
                </div>
                <div className="p-4 w-56 bg-green-100 rounded flex items-center">
                    <p className="text-green-600">
                        Remaining: ${budget-spending}
                    </p>

                </div>
                <div className="bg-blue-100 p-4 w-56 rounded flex items-center">
                    <p className="text-blue-600">
                        Spending: ${spending}
                    </p>

                </div>

            </div>
            <Content setSpending = {setSpending}/>
        </div>
       
    )
}

export default Header