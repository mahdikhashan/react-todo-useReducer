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
      return 0
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

  return (
    <>
      <div>
        <span style={{ color: todo.complete ? '#00FF00' : '#ff0000' }}>
          { todo.name }
        </span>
        <button onClick={() => dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id: todo.id } })}>update</button>
        <button onClick={() => dispatch({ type: ACTIONS.DONE_TODO, payload: { id: todo.id } })}>
          { todo.complete ? 'undone' : 'done' }
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })}>delete</button>
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
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        <button type={"submit"} onClick={handleSubmit}>add</button>
      </form>
      {
        todos.map( todo => {
          return <Todo todo={todo} dispatch={dispatch} />
        })
      }
    </div>
  );
}

export default App;
