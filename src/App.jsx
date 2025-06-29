import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState("")


  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
  }

  const handleCheckbox = (e, id) => {
    let newTodo = [...todos]
    for (let i = 0; i < newTodo.length; i++) {
      if (newTodo[i].id === id) {
        newTodo[i].isCompleted = !newTodo[i].isCompleted
      }
    }
    setTodos(newTodo)

  }

  const handleDelete = (e, id) => {
    let updatedTodo = todos.filter((item) => item.id !== id);
    setTodos(updatedTodo)
  };

  const handleEdit = (e, id) => {
    let todo = todos.filter(item => item.id == id)
    let updatedTodos = todos.filter(item => item.id !== id)
    setTodo(todo[0].todo)
    setTodos(updatedTodos)
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished) 
  }




  return (
    <>
      <Navbar />
      <div className='container mx-auto my-5 w-1/2 rounded-xl bg-violet-200 p-5 '  >
        <div className='add a todo'>
          <h2 className='text-xl font-bold ml-2 '>Add a todo</h2>
          <input type='text' onChange={handleChange} value={todo} className='bg-white w-1/2 h-[2.5rem] rounded-md mt-4' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='px-2 py-2 ml-4 font-bold text-white bg-violet-800 rounded-md  cursor-pointer hover:bg-violet-950'>Add</button>
        </div>

        <div className='YourTodo '>
          <input  onChange={toggleFinished} type='checkbox' checked={showFinished} className='my-6' /> Show Finished
          <div className='h-[3px] bg-black opacity-15  mx-auto my-2'></div>
          <h2 className='text-2xl font-bold mt-9 '>Your Todos</h2>
          {todos.length ? "" : <div className='text-2xl font-bold m-10'>No Todos to Display Please add Todo First</div>}
          {todos.map(item => {

            return   (showFinished || !item.isCompleted) &&  <div key={item.id} className={` ${item.todo.length > 50 ? "flex  mt-6 w-[70rem]" : "flex justify-between mt-6 w-[]"} `}>
              <input  className='mt-2' checked={item.isCompleted} type='checkbox' onClick={(e) => handleCheckbox(e, item.id)} />
              <h2 className={` text-xl mt-3 w-[34.1rem] ${item.isCompleted ? "line-through" : ""} ${item.todo.length > 50 ? "ml-3" : ""}`}>{item.todo}</h2>
              <div className='flex gap-2 ml-3'>
                <button onClick={(e) => (handleEdit(e, item.id))} className={item.todo.length > 50 ? 'bg-violet-800 px-3 h-[2.5rem]   font-bold text-white rounded-md cursor-pointer hover:bg-violet-950 mt-[1rem]' : "bg-violet-800 px-3 py-2 font-bold text-white rounded-md cursor-pointer hover:bg-violet-950 mt-2"}><MdEdit /></button>
                <button onClick={(e) => (handleDelete(e, item.id))} className={item.todo.length > 50 ? 'bg-red-600 px-3 h-[2.5rem] font-bold text-white rounded-md cursor-pointer hover:bg-red-800 mt-[1rem]' : "bg-red-600 px-3 py-2 font-bold text-white rounded-md cursor-pointer hover:bg-red-800 mt-2"}><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
