import React, {Fragment, useState} from 'react'
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e:FormElem):void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string):void => {
    const newTodo: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodo)  
  }

  const completeTodo = (index:number):void => {
    const newTodos:ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index:number):void => {
    const newTodos:ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos);
  }

  return (
    <div className='app-container'>
    <Fragment>
      <h1 className='title'>Typescript React Todo List</h1>
      <form className='todo-form' onSubmit={handleSubmit}>
        <label className='todo-label' htmlFor='todo-input'>Todo:</label>
        <input id='todo-input' type='text' value={value} onChange={e => setValue(e.target.value)} required></input>
        <button className='addTodo-button' type='submit'>Add Todo</button>
      </form>
      <section>
        {todos.map((todo:ITodo, index:number) => {
          return (
          <div className='todo-display' key={index} style={{textDecoration: todo.complete ? 'line-through' : 'none'}}>
            {todo.text}
            {'  '}
            <input className='todo-complete-box' type='checkbox' onChange={() => completeTodo(index)}></input>
            <button type='button' onClick={() => removeTodo(index)}>
             &times;
            </button>
          </div>
          )
        })
        }
      </section>
    </Fragment>
    </div>
  );
}

export default App;
