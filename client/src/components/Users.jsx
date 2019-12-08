import React from 'react'
import axios from 'axios'
import EditUser from "./EditUser"

function Users(props) {

  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this user?")
    if (result) {
      axios.delete(`http://localhost:3000/api/users/${props.user.id}`)
    }
  }

  const handleEdit = () => {

  }
  return (
    <>
      <hr/>
      <h3>Name: {props.user.name}</h3>
      <p>Bio: {props.user.bio}</p>
      <button onClick={handleDelete}>Delete</button>
      <div onClick={handleEdit}><EditUser user={props.user} setUser={props.setUsers} /></div>
      <hr/>
    </>
  )
}

export default Users
