# React useReducer hook

The intentions for this project was to implement a simple todo app using react useReducer hook.

## How in the world to initialize a useReducer
a simple reducer hook expects us to provide a reducer object and initial state ```[]``` , here an empty array.
```javascript
const [todos, dispatch] = useReducer(reducer, [])
```
so, easy-peasy, not? Then how to add value(s) to our empty state? right, we need to call ```dispatch``` function 
with our ```action``` and pass ```payload``` to it.

### What's a dispatch function looks like?
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
and commands `action` passed as arguments. Don't forget to set a default value if you used swtich-case login.
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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.