import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");

  const addtodo = () => {
    console.log(inputValue);
    todo.push(inputValue);
    setTodo([...todo]);
    todo(" ")
  };

  const deleteAll = () => {
    setTodo([]);
  };

  const deleteTodo = (ind) => {
    console.log("hello", ind);
    todo.splice(ind, 1);
    setTodo([...todo]);
  };

  const editTodo = (ind) => {
    console.log("edit",editInputValue);
    setIndexValue(ind);
    setEditInputValue(todo[ind])
  };

  const updateValue = () => {
    console.log(editInputValue);
    todo.splice(indexValue, 1, editInputValue);
    setTodo([...todo]);
    setIndexValue("");
    setEditInputValue("");
  };
  console.log("todo", todo);

  return (
    <>
      <div className="mainBox">
        <div className="mainBox1">
          <h1>Todo App React</h1>
          <div className="getInput">
            <input
              type="text"
              placeholder="Take a Note"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="noteBtn" onClick={addtodo}>
              Add Task
            </button>
            <button className="deltAllBtn" onClick={deleteAll}>
              Delete All
            </button>
          </div>
        </div>

        <div className="mainBox2">
          {todo.map((value, index, array) => {
            return index === indexValue ? (
              <>
              <div key={index} className="edit">
                  <input className="editValue" onChange={(e) => setEditInputValue(e.target.value)} value={editInputValue}/>
                  <div className="EditValuebuttons">
                    <button onClick={updateValue}>Update</button>
                  </div>
                </div></>
            ) : (
              <>
                <div key={index} className="list">
                  <div className="listValue">
                      {value}
                  </div>
                  <div className="buttons">
                    <button onClick={() => editTodo(index)}>Edit</button>
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
