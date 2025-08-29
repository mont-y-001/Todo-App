import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
uuidv4();

import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveTOLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }

  function toggleFinished(e) {
    setshowFinished(!showFinished)
  }

  function handleEdit(e, id) {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTOLS(newTodos)   
  }

  function handleDel(e, id) {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveTOLS(newTodos);   
  }

  function handleAdd() {
  
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveTOLS(newTodos);
  }

  function handleChange(e) {
    setTodo(e.target.value)
  }

  function handleCheckbox(e) {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTOLS(newTodos); 
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh ] md: w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
        
            <button
              disabled={todo.length <= 3}
              className='bg-violet-800 disabled:bg-violet-700 mx-2 py-1 p-2 text-sm font-bold text-white rounded-full'
              onClick={handleAdd}
            >
              Save
            </button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div>No Todo to Display </div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) &&
              <div key={item.id} className={"todo flex md:w-1/2 my-3 justify-between"}>
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 mx-1 py-1 p-2 text-sm font-bold text-white rounded-md '><FaEdit /></button>
                  <button onClick={(e) => handleDel(e, item.id)} className='bg-violet-800 hover:bg-violet-950 mx-1 py-1 p-2 text-sm font-bold text-white rounded-md '><AiFillDelete /></button>
                </div>
              </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
