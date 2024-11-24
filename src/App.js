import 'react-notifications/lib/notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [todolist, setTodolist] = useState([]);
  
  let saveToDoList = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    let toname = event.target.toname.value; // Get the value of the input field
    if (toname === '') {
      toast.error('Field is required..');
      return;
    }
    if (!todolist.includes(toname)) {
      let finaldolist = [...todolist, toname];
      setTodolist(finaldolist);
      toast.success(`"${toname}" added`);
      event.target.toname.value = ''; // Clear the input field
    } else {
      toast.error(`"${toname}" already exists`);
    }
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        indexNumber={index}
        todolist={todolist}
        setTodolist={setTodolist}
      />
    );
  });

  return (
    <div className="App">
      <ToastContainer />
      <h1>ToDo LIST</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" />
        <button>Add</button>
      </form>
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {
  let deleteRow = () => {
    toast.success(`"${value}" completed`);
    let finaldata = todolist.filter((v, i) => i !== indexNumber);
    setTodolist(finaldata);
  };

  let [state, setState] = useState(false);
  return (
    <li
      className={state ? 'completetodo' : ''}
      onClick={() => setState(!state)}
    >
      {indexNumber + 1}. {value} <span onClick={deleteRow}>&times;</span>
    </li>
  );
}
