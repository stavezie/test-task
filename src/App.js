import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as React from "react";
import Main from "./components/Main/Main";

function App() {

  const [users, setUsers] = React.useState([]);
  const [checked, setChecked] = React.useState('false');

  return (
    <div className='app'>
      <Main
      users={users}
      setUsers={setUsers}
      checked={checked}
      setChecked={setChecked}/>
    </div>
  );
}

export default App;
