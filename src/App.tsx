import React, {Fragment, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
  id: string
}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])
  
  const getIndex = (id:string):number => {
    for(let i = 0; i < todos.length; i++){
      if (todos[i].id === id){
        return i;
      }
    }
    return -1
  }

  const handleSubmit = (e:FormElem):void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string):void => {
    const newTodo: ITodo[] = [...todos, {text, complete: false, id: uuidv4()}]
    setTodos(newTodo)  
  }

  const completeTodo = (id:string):void => {
    const newTodos:ITodo[] = [...todos]
    let index = (id:string):number => {
      for(let i = 0; i < newTodos.length; i++){
        if (newTodos[i].id === id){
          return i;
        }
      }
      return -1
    }
    newTodos[index(id)].complete = !newTodos[index(id)].complete
    setTodos(newTodos)
  }

  const removeTodo = (id:string):void => {
    const newTodos:ITodo[] = [...todos]
    let index = (id:string):number => {
      for(let i = 0; i < newTodos.length; i++){
        if (newTodos[i].id === id){
          return i;
        }
      }
      return -1
    }
    newTodos.splice(index(id), 1)
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
        {todos.map((todo:ITodo, id:number) => {
          return (
          <div className='todo-display' key={todo.id} style={{textDecoration: todo.complete ? 'line-through' : 'none'}}>
            {todo.text}
            {'  '}
            <input className='todo-complete-box' type='checkbox' onChange={() => completeTodo(todo.id)}></input>
            <button type='button' onClick={() => removeTodo(todo.id)}>
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
