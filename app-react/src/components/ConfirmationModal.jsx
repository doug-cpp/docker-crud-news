import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationCloseModal = props => {

    const confirmAndClose = () => {
        props.confirmAction();
        props.onClose();
    }

    return (
        <Modal show={true} onHide={props.onClose}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>{props.confirmationTitle || 'Confirmação'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.confirmationMessage || 'Confirma esta ação?'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        {props.noButtonLabel}
                    </Button>
                    <Button type="submit" variant="primary" onClick={confirmAndClose}>
                        {props.yesButtonLabel}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default ConfirmationCloseModal;
