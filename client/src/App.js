import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Users from "./components/Users"
import AddUser from "./components/AddUser"
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
    .then((res) => {
      setUsers(res.data)
    })
    .catch((err) => {
      setError(err.message)
    })
  }, [users])
  return (
    <div className="App">
      <h1>Users</h1>
      <AddUser user={users} setUsers={setUsers} />
    
    {users.map((user) => (
      <Users key={user.id} user={user} setUsers={setUsers} />
    ))}
    </div>
  );
}

export default App;
