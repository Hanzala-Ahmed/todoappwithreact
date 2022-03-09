import React, { useEffect, useState } from "react";
import "./Todo.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [editableForm, setEditableForm] = useState(false);
  const [editItemId, setEditItemId] = useState("");

  const addtodo = () => {
    if (inputValue.length > 3) {
      // console.log(inputValue);
      todo.push(inputValue);
      setTodo([...todo]);
      setInputValue("");
      // console.log([db]);
    } else {
      alert("First you need to enter any task");
      // console.log(inputValue);
    }
  };

  const deleteAll = () => {
    setTodo([]);
  };

  const deleteTodo = (ind) => {
    // console.log("hello", ind);
    todo.splice(ind, 1);
    setTodo([...todo]);
  };

  const editTodo = (id, note) => {
    setEditItemId(id);
    setInputValue(note);
    setEditableForm(true);
  };

  const updateValue = () => {
    // console.log(editInputValue);
    todo.splice(indexValue, 1, editInputValue);
    setTodo([...todo]);
    setIndexValue("");
    setEditInputValue("");
  };
  // console.log("todo", todo);

  // add data in firebase

  const addData = async () => {
    if(inputValue.length < 1){
      return
    }

    await addDoc(collection(db, "Note"), {
      notes: inputValue,
    })
      .then(() => {
        console.log("data added");
        setInputValue("");
        getData();
      })
      .catch((error) => {
        console.log("eror", error);
      });
  };

  // get data from firebase

  const getData = async () => {
    let note = [];
    const querySnapshot = await getDocs(collection(db, "Note"));
    querySnapshot.forEach((doc) => {
      note.push({
        id: doc.id,
        notes: doc.data().notes,
      });
    });
    setTodo(note);
  };

  useEffect(() => {
    getData();
  }, []);

  const editData = async () => {
    if(inputValue.length < 1){
      return
    }

    await updateDoc(doc(db, "Note", editItemId), {
      notes: inputValue,
    })
      .then(() => {
        onCancel();
        getData();
        console.log("Item Edited Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCancel = () => {
    setInputValue("");
    setEditableForm(false);
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "Note", id))
      .then(() => {
        console.log("delete note");
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAllData = () => {
    todo.forEach(val => {
      deleteData(val.id)
    })
  }

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
              value={inputValue}
            />
            {editableForm ? (
              <>
                <button className="noteBtn" onClick={editData}>
                  Edit Task
                </button>
                <button className="deltAllBtn" onClick={onCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="noteBtn" onClick={addData}>
                  Add Task
                </button>
                <button className="deltAllBtn" onClick={deleteAllData}>
                  Delete All
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mainBox2">
          {todo.map((value, index) => {
            return (
              <div className="list" key={value.id}>
                <div className="listValue">{value.notes}</div>
                <div className="buttons">
                  <button onClick={() => editTodo(value.id, value.notes)}>
                    Edit
                  </button>
                  <button onClick={() => deleteData(value.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
