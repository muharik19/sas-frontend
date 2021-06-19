import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

const ModalComponent = (props) => {
  const { isOpen, toggleModal, children, modalTitle, className, handleSubmit, disableSubmit } = props;

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal} unmountOnClose={true} className="modal-lg" style={{ zIndex: 10000 }}>
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} disabled={disableSubmit}>
            SUBMIT
          </Button>
          <Button color="secondary" onClick={toggleModal} disabled={disableSubmit}>
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;

ModalComponent.defaultProps = {
  isOpen: false,
  toggleModal: () => null,
  modalTitle: "Modal Title",
  handleSubmit: () => null,
  disableSubmit: false,
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  modalTitle: PropTypes.string,
  handleSubmit: PropTypes.func,
  disableSubmit: PropTypes.func,
};
