import "../styles/AddNewNoteForm.css"
import "../styles/App.css"
import React, { useState } from "react";
import getFormattedDate from "../helpers/getFormattedDate";


export default function AddNewNoteForm (props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: getFormattedDate(),
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <div
     className="new-note">
      <form
        className="note-form"
        onSubmit={(e) => {
          props.handleSubmit(note);
          if (!note.content) {
            alert("Don't forget to add a task ;)")
        }
          setNote({
            title: "",
            content: "",
            date: (getFormattedDate())
          })
          e.preventDefault();
        }}
      >
        <input
          className="title"
          onChange={handleInput}
          name="title"
          id="field"
          placeholder="Subject"
          maxLength="20"
          value={note.title || ""} 
        />

        <textarea
          className="textarea-input"
          onChange={handleInput}
          name="content"
          placeholder="My new note... "
          maxLength="20"
          value={note.content || ""}
        />
          <button 
          className="add-note-btn"
          type="submit">
            Add
          </button>
      </form>
    </div>
  );
}