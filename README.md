# React useReducer hook

The intentions for this project was to implement a simple todo app using react useReducer hook.

## How in the world to initialize a useReducer
a simple reducer hook expects us to provide a reducer object and initial state ```[]``` , here an empty array.
```javascript
const [todos, dispatch] = useReducer(reducer, [])
```
so, easy-peasy, not? Then how to add value(s) to our empty state? right, we need to call ```dispatch``` function 
with our ```action``` and pass ```payload``` to it.

### What's a dispatch function look like?
```javascript
dispatch({ type: ACTIONS.ADD_TODO, payload: { name: item } })
```
so then, a ```dispatch``` function receives an object with ```action``` and ```payload```. 

#### Actions, like a command
we will define command in an enum like object, here it's called `ACTIONS`.
```javascript
const ACTIONS = {
  ADD_TODO: 'add-todo',
  REMOVE_TODO: 'remove-todo',
  UPDATE_TODO: 'update-todo',
  DONE_TODO: 'done-todo'
}
```

### Reducer
And finally, we will define our logic in a reducer method. Passing the state object, here `todos`, 
and commands `action` are arguments. Don't forget to set a default value if you used swtich-case logic.
```javascript
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
```
