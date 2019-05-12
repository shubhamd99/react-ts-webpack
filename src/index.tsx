import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// type refrences another type
type FormElem = React.FormEvent<HTMLFormElement>

// interface refereces new type
interface ITodo {
  text: string,
  complete: boolean
}

export default function App(): JSX.Element {

  // React Hooks
  const [value, setValue] = useState<string>('') // initial value - ''
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodos(value)
    setValue('')
  }

  const addTodos = (text: string): void => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  console.log(todos)

  return (
    <React.Fragment>
        <h1 className="ml-2">Todo List</h1>
        <form className="form-inline mb-2" onSubmit={handleSubmit}>
            <div className="col-sm-6">
              <input type="text" value={value} onChange={e => setValue(e.target.value)} className="form-control mr-2" required />
              <button type="submit" className="btn btn-outline-primary">Add</button>
            </div>
        </form>
        <ul>
            {
              todos.map((todo: ITodo, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <li className="mb-3">
                      {todo.text}{' '}
                        <button type="button" className={`btn ${!todo.complete ? 'btn-success' : 'btn-warning'} btn-sm`} onClick={() => completeTodo(index)}>
                            { !todo.complete ? 'Complete' : 'Incomplete' }
                        </button>
                        <button type="button" className="ml-2 btn btn-danger btn-sm" onClick={() => removeTodo(index)}>
                            Delete
                        </button>
                      </li>
                    </React.Fragment>
                  )
                  
              })
            }
        </ul>
    </React.Fragment>
  )
}

const root = document.getElementById('app-root')

ReactDOM.render(<App />, root)

