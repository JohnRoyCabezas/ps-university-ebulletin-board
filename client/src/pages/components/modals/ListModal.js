import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const ListModal = ({ users, show, setShow, headerTitle, user_id }) => {
  const navigate = useNavigate();
  const handleUserClick = (id) => {
    setShow(false);
    navigate(`/profile/${id}`);
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {headerTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {users && users.length ? (
          users.map((user) => {
            return (
              <div
                key={user.id}
                className="d-flex align-items-center w-100 border rounded p-3 my-2"
              >
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
                  width="50"
                  alt="user-profile"
                  height="50"
                  style={{ objectFit: "cover" }}
                  className="rounded-circle me-3 border border-3 border-success"
                />
                <div>
                  <span className="d-block small text-primary">
                    {user.name} {user.id === user_id && "(You)"}
                  </span>
                  <span className="small">{user.email}</span>
                </div>
                <div className="ms-auto">
                  <Button
                    className="btn btn-sm btn-primary"
                    label={"View Profile"}
                    isValid={true}
                    handleClick={() => handleUserClick(user.id)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center my-5">No users found.</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-secondary"
          label={"Close"}
          isValid={true}
          handleClick={() => setShow(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ListModal;
