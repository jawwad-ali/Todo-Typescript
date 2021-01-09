import React, { useState, useRef } from "react"
import shortid from "shortid"
import { TodoFormInterface, TodoInterface } from "../Interfaces/interface"

const TodoForm = (props: TodoFormInterface) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [values, setValues] = useState("")

    function hanldeInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValues(event.target.value)
    }

    function handleInputEnter(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            const newTodo: TodoInterface = {
                id: shortid.generate(),
                name: values,
                isCompleted: false
            }
            props.handleTodoCreate(newTodo)

            if (inputRef && inputRef.current) {
                inputRef.current.value = ""
            }
        }
    }
    return (
        <div className="todo-form">
            <input ref={inputRef} type="text" placeholder="Enter new Todo" onChange={event => hanldeInputChange(event)}
                onKeyPress={event => handleInputEnter(event)}
            />
        </div>
    )
}
export default TodoForm