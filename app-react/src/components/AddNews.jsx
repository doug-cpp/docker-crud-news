import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, connect } from "react-redux";
import { addNews } from "app-redux/actions/newsActions";

// Monitora se algum erro de servidor ocorreu ao tentar cadastrar/autenticar:
const mapStateToProps = state => {
    return state.newsList
}

const AddNews = props => {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(
        {
            publishingTitle: '',
            publishingContents: ''
            // A data será gerada no servidor
        });

    const updateFormValue = ({ target: { name, value } }) =>
        setInputs(inputObj => ({ ...inputObj, [name]: value }));

    const submitForm = (e) => {
        e.preventDefault();
        if (!formValid()) {
            return;
        }

        setInputs({
            publishingTitle: inputs.publishingTitle.toString().trim(),
            publishingContents: inputs.publishingContents.toString().trim()
        });

        dispatch(addNews({ ...inputs }));
        props.onClose();
    };

    useEffect(() => {
        setFormValidationMessage(props.error || '');
    },[props.error]);

    const [formValidationMessage, setFormValidationMessage] = useState('');

    const formValid = () => {
        const publishingTitleValid = 
            inputs.publishingTitle &&
            inputs.publishingTitle.length > 2 &&
            inputs.publishingTitle.length < 199;

        const publishingContentsValid =
            inputs.publishingContents &&
            inputs.publishingContents.length > 4 &&
            inputs.publishingContents.length < 2001;

        setFormValidationMessage('');

        if(!publishingTitleValid) {
            setFormValidationMessage('Digite um título válido para a notícia')
        } else if(!publishingContentsValid) {
            setFormValidationMessage('Digite um conteúdo válido para a notícia')
        }

        return publishingTitleValid && publishingContentsValid;
    }

    return (
        <Modal show={true} onHide={props.onClose}>
            <form onSubmit={submitForm} className="bg-light">
                <Modal.Header closeButton>
                    <Modal.Title>Nova notícia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                className="form-control"
                                value={inputs.publishingTitle}
                                name="publishingTitle"
                                minLength={2}
                                maxLength={200}
                                required
                                onChange={e => updateFormValue(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Conteúdo</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={inputs.publishingContents}
                                name="publishingContents"
                                minLength={5}
                                maxLength={2000}
                                required
                                onChange={e => updateFormValue(e)}
                            ></textarea>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-outline-dark" onClick={props.onClose}>
                        <i className="fas fa-times mr-2"></i>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-outline-dark">
                        <i className="fas fa-save mr-2"></i>
                        Adicionar notícia
                    </button>
                </Modal.Footer>
            <center className="invalid-form">{formValidationMessage}</center>
            <center>&nbsp;</center>
            </form>
        </Modal>
    );
};

export default connect(mapStateToProps)(AddNews);
