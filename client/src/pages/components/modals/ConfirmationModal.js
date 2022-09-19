import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../button/Button";

const ConfirmationModal = ({
  show,
  setShow,
  title,
  body,
  closeLabel,
  actionLabel,
  handleModalClick,
  isLoading,
}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-secondary"
          label={closeLabel}
          isValid={true}
          handleClick={() => setShow(false)}
        />
        <Button
          className="btn btn-primary"
          label={actionLabel}
          isValid={true}
          isLoading={isLoading}
          handleClick={() => handleModalClick()}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
