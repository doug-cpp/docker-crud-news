import React, { useState } from "react";
import { updateNews, deleteNews } from "app-redux/actions/newsActions";
import ConfirmationCloseModal from "components/ConfirmationModal";
import { formatDatetime } from 'resources/utils'
import { useDispatch } from "react-redux";


const NewsCard = ({ publishingTitle, publishingContents, publishingDate, _id }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);

    // A data não será alterada, por isso não será monitorada ao digitar:
    const [inputs, setInputs] = useState({ publishingTitle, publishingContents });

    const updateFormValue = ({ target: { name, value } }) =>
        setInputs((inputObj) => ({ ...inputObj, [name]: value }));

    const toggleEditMode = () => setEditMode((mode) => !mode);

    const updateNewsData = () => {

        if (!formValid()) {
            return;
        }
        setInputs({
            publishingTitle: inputs.publishingTitle.toString().trim(),
            publishingContents: inputs.publishingContents.toString().trim()
        });
        dispatch(updateNews(_id, { ...inputs }));
        toggleEditMode();
    };

    const [formValidationMessage, setFormValidationMessage] = useState('');

    const formValid = () => {
        const publishingTitleValid = 
            inputs.publishingTitle &&
            inputs.publishingTitle.length > 2 &&
            inputs.publishingTitle.length < 200;

        const publishingContentsValid =
            inputs.publishingContents &&
            inputs.publishingContents.length > 5 &&
            inputs.publishingContents.length < 2000;

        setFormValidationMessage('');

        if(!publishingTitleValid) {
            setFormValidationMessage('Digite um título válido para a notícia')
        } else if(!publishingContentsValid) {
            setFormValidationMessage('Digite um conteúdo válido para a notícia')
        }

        return publishingTitleValid && publishingContentsValid;
    }

    const openConfirmDelete = () => {
        toggleConfirmDeleteVisiblity();
    };

    const deleteNewsFromList = () => {
        dispatch(deleteNews(_id));
    };
    
    const [confirmDeleteVisiblity, setConfirmDeleteVisiblity] = useState(false);
    
    const toggleConfirmDeleteVisiblity = () =>
    setConfirmDeleteVisiblity(visiblity => !visiblity);
    
    const formatPtBrPublishingDate = () => {
        if(!publishingDate) return false;
        return formatDatetime(publishingDate);
    }

    const editButtonHandle = () => {
        toggleEditMode();
        setFormValidationMessage('');
    }

    return (
        <>
            <li className="list-group-item">
                <div className="card border-0">
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <p className="card-date-right">
                                {!editMode && 'Notícia publicada em: ' + formatPtBrPublishingDate()}
                            </p>
                            </div>
                            <div className="col-md-12">
                            <div className="card-body py-1 px-2 text-left">
                                <h5 className="card-title">
                                    {!editMode && publishingTitle}
                                    {editMode && (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputs.publishingTitle}
                                            name="publishingTitle"
                                            placeholder="Título da notícia"
                                            minLength={2}
                                            maxLength={200}
                                            required
                                            onChange={(e) => updateFormValue(e)}
                                        />
                                    )}
                                </h5>
                                <p className="card-text">
                                    {!editMode && publishingContents}
                                    {editMode && (
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            value={inputs.publishingContents}
                                            name="publishingContents"
                                            placeholder="Conteúdo da notícia"
                                            minLength={5}
                                            maxLength={2000}
                                            required
                                            onChange={(e) => updateFormValue(e)}
                                        ></textarea>
                                    )}
                                </p>
                                <p className="card-text">
                                    {!editMode && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-outline-dark"
                                                onClick={e => editButtonHandle()}
                                            >
                                                <i className="fas fa-edit mr-2"></i>
                                                Alterar
                                            </button>&nbsp;&nbsp;
                                            <button
                                                type="button"
                                                className="btn btn-outline-dark"
                                                onClick={e => openConfirmDelete()}
                                            >
                                                <i className="fas fa-trash mr-2"></i>
                                                Apagar
                                            </button>
                                        </>
                                    )}

                                    {editMode && (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-outline-dark"
                                                onClick={updateNewsData}
                                            >
                                                <i className="fas fa-save mr-2"></i>
                                                Salvar
                                            </button>&nbsp;&nbsp;
                                            <button
                                                type="button"
                                                className="btn btn-outline-dark"
                                                onClick={editButtonHandle}
                                            >
                                                <i className="fas fa-times-circle mr-2"></i>
                                                Cancelar
                                            </button>
                                        </>
                                    )}
                                </p>
                            </div>
                            <center className="invalid-form">{formValidationMessage}</center>
                        </div>
                    </div>
                </div>
            </li>

            {confirmDeleteVisiblity && (
                <ConfirmationCloseModal
                    onClose={toggleConfirmDeleteVisiblity}
                    confirmAction={deleteNewsFromList}
                    yesButtonLabel="Sim"
                    noButtonLabel="Não"
                    confirmationTitle="Remover notícia"
                    confirmationMessage="Tem certeza que quer apagar esta notícia?"
                />
            )}
        </>
    );
};

export default NewsCard;
