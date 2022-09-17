import React from 'react';
import { useReducer, useState } from "react";
import './App.css';

const ACTIONS = {
  ADD_TODO: 'add-todo',
  REMOVE_TODO: 'remove-todo',
  UPDATE_TODO: 'update-todo',
  DONE_TODO: 'done-todo'
}

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.REMOVE_TODO:
      // remove to-do from the state
      return todos.filter(todo => todo.id !== action.payload.id)
    case ACTIONS.UPDATE_TODO:
      // update to-do to the state
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name }
        }
        return todo
      })
    case ACTIONS.DONE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    default:
      throw new Error();
  }
}

const newTodo = (name) => {
  return { id: Date.now(), name: name, complete: false }
}

const Todo = ({ todo, dispatch }) => {
  const [editTodo, setEditTodo] = useState(false)
  const [item, setItem] = useState(todo.name)

  const editItem = () => {
    dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id: todo.id, name: item } })
    setEditTodo(false)
  }

  return (
    <>
      <div className='todo-row'>
        {
          editTodo ?
            <div>
              <input type="text" name='edit' value={item} onChange={(e) => setItem(e.target.value)} />
              <button name='update-item' onClick={editItem}>update</button>
              <button name='back' onClick={() => setEditTodo(false)}>back</button>
            </div>
          :
         <div>
            <span style={{
              color: todo.complete ? '#535353' : '#00c2ff',
              textDecoration: todo.complete ? 'line-through' : ''
            }}>
              { todo.name }
            </span>
            <button name='edit-item' onClick={() => setEditTodo(true)}>edit</button>
            <button name='toggle-item' onClick={() => dispatch({ type: ACTIONS.DONE_TODO, payload: { id: todo.id } })}>
              { todo.complete ? 'undone' : 'done' }
            </button>
            <button name='delete-item' onClick={() => dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })}>delete</button>
         </div>
        }
      </div>
    </>
  )
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [item, setItem] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: item } })
    setItem('')
  }

  return (
    <div className="App">
      <form>
        <input type="text" value={item} name='new' onChange={(e) => setItem(e.target.value)} />
        <button type={"submit"} name='add-item' onClick={handleSubmit}>add</button>
      </form>
      <main className='todo'>
        {
          todos.map( todo => {
            return <Todo todo={todo} dispatch={dispatch} />
          })
        }
      </main>
    </div>
  );
}

export default App;
export {
  Todo,
  newTodo
}
