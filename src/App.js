
import './App.css';
import * as React from "react";
import Main from "./components/Main/Main";

function App() {

  const [users, setUsers] = React.useState([]);
  const [currency, setCurrency] = React.useState([]);

  return (
    <div className='app'>
      <Main
      users={users}
      setUsers={setUsers}
      currency={currency}
      setCurrency={setCurrency}/>
    </div>
  );
}

export default App;
