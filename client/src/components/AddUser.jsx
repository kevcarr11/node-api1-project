import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const AddUser = (props) => {

  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    name: "",
    bio: ""
  })

  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3000/api/users`, update)
    .then(() => {
      return axios.get("http://localhost:3000/api/users")
    })
    .then((res) => {
      props.setUser(res.data)
    })
    .catch(err => console.log(err))
    setModal(!modal)
  }
  return (
    <div>
      <Button color="link" onClick={toggle}>Add User</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a New User</ModalHeader>
        <ModalBody>
          <form>
            <input type="text" name="name" value={update.name} onChange={handleChange} placeholder="Name" />
            <input type="textarea" name="bio" value={update.bio} onChange={handleChange} placeholder="Bio" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Save</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddUser;