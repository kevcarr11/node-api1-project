import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const EditUser = (props) => {

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
    axios.put(`http://localhost:3000/api/users/${props.user.id}`, update)
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
      <Button color="link" onClick={toggle}>Edit</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
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

export default EditUser;
