
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

// Custom hook for managing todos in local storage
function UseLocalStorageTodos(initialValue) {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return [todos, setTodos];
}

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = UseLocalStorageTodos([]);

  const [showFinished, setShowFinished] = useState(true);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const editedTodo = todos.find(item => item.id === id);
    if (editedTodo) {
      setTodo(editedTodo.todo);
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodo = { id: uuidv4(), todo: todo.trim(), isCompleted: false };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <div className="container min-h-[70vh] md:m-12 md:px-[10%] md:w-[94%] p-4 bg-[#0e102f]">
          <div>
            <div className='text-2xl my-3 font-semibold'>
              Enter Todo
            </div>
            <div>
              <input
                onChange={handleChange}
                value={todo}
                className="input1 md:mr-6 p-2 border-none bg-[#1f214a] border-b-2 border-blue-500 focus:border-blue-700 md:w-1/2 rounded-md"
                type="text"
                placeholder="Enter Here"
              />
              <button
                onClick={handleAdd}
                disabled={!todo.trim()}
                className='cursor-pointer border-0 bg-orange-300 p-1 px-2 m-2 rounded-md text-black text-xl font-bold hover:text-white hover:bg-black box-border ease-in-out transition-all duration-500'>
                Add
              </button>
            </div>
          </div>
          <div>
            <input
              className='my-4'
              id='show'
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
            />
            <label className='mx-2' htmlFor="show">Show Finished</label>
            <div className='text-2xl mt-3 my-2 font-semibold'>
              Your Todo's
            </div>
            <div className="todos">
              {todos.length === 0 && <div className='text-blue-200'>No Todos yet to display</div>}
              {todos.map(item => (
                (showFinished || !item.isCompleted) &&
                <div key={item.id} className="atodo flex gap-3 min-w-4 items-center my-3">
                  <input
                    onChange={() => handleCheckbox(item.id)}
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={`todo1 md:w-[50%]  ${item.isCompleted ? "line-through" : ""}`}>
                    {item.todo}
                  </div>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="delete border-0 p-1 bg-green-500 rounded-md text-black text-xl font-normal hover:text-white hover:bg-black box-border ease-in-out transition-all duration-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="edit border-0 p-1  bg-orange-700  rounded-md text-black text-xl font-normal hover:text-white hover:bg-black box-border ease-in-out transition-all duration-600">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;



