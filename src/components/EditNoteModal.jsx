import "../styles/App.css"
import "../styles/EditNoteModal.css"
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";


export default function EditNoteModal(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [titleContent, setTitleContent] = useState(props.title);

  useEffect(() => {
    setIsEditable(false);
    setTitleContent(props.title); 
  }, [props.modalDate]);

  function handleSaveNoteAndDate(id, e) {
    props.saveNote(id, e);
    props.setModalDate(getFormattedDate());
  }

  return (
    <Modal className="modal" {...props} centered show={props.show} onHide={props.onHide} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          <h4
          onClick={() => setIsEditable(true)}
            className="title"
            contentEditable={isEditable}
            data-name="title"
            maxLength="20"
          value={props.title}
          dangerouslySetInnerHTML={{ __html: props.title }}
          onBlur={(e) => handleSaveNoteAndDate(props.id, e)} 
        >
          {props.title};
        </h4>
      </Modal.Title>
    <Modal.Body
    className="modal-body"
    >
      <p
        className="textarea-content"
        data-name="content"
        maxLength="20"
        value={props.content}
        contentEditable={isEditable}
        onBlur={(e) => {
          props.saveNote(props.id, e);
        }}
      >
        {props.content};
      </p>
    </Modal.Body>
    </Modal.Header>
      <button
      className="modal-edit-button"
      onClick={() => {
        onkeydown=setIsEditable(true);  
      }}
      >
       Tap to edit
      </button>
      <button
        className="modal-close-button"
        onClick={() => {
          setIsEditable(false);
          props.onHide();
        }}
      >
        Save
      </button>
  </Modal>
);
}