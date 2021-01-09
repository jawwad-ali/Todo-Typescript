import React, { useEffect, useState } from "react"
import TodoForm from "./Components/TodoForm"
import TodoList from "./Components/TodoList"
import { TodoInterface } from "./Interfaces/interface"
import "./style.css"

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoInterface[]>([])

  useEffect(() => {
    const getTodo = localStorage.getItem("todo-list")

    if (getTodo) {
      setTodos(JSON.parse(getTodo))
    }
  }, [])

  useEffect(() => {
    if (todos) {
      localStorage.setItem("todo-list", JSON.stringify(todos))
    }
  }, [todos])

  function handleTodoCreate(todo: TodoInterface) {
    let newTodosState: TodoInterface[] = [...todos]

    newTodosState.push(todo)


    // LOCAL STORAGE
    // localStorage.setItem("todo-list", JSON.stringify(newTodosState))
    // newTodosState = JSON.parse(localStorage.getItem("todo-list"))

    setTodos(newTodosState)
  }

  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {

    const newTodosState: TodoInterface[] = [...todos]

    newTodosState.find((todo: TodoInterface) => todo.id === id)!.name = event.target.value

    setTodos(newTodosState)
  }

  function handleTodoRemove(id: string) {
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)
    setTodos(newTodosState)
  }

  function handleTodoComplete(id: string) {
    const newTodosState: TodoInterface[] = [...todos]

    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted = !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted

    setTodos(newTodosState)
  }



  return (
    <div className="App">
      <>
        <h2>My Todo APP</h2>
        <TodoForm
          todos={todos}
          handleTodoCreate={handleTodoCreate}
        />
        <TodoList
          todos={todos}
          handleTodoUpdate={handleTodoUpdate}
          handleTodoRemove={handleTodoRemove}
          handleTodoComplete={handleTodoComplete}

        />

      </>

    </div>
  )
}

export default App;
