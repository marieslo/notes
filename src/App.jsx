import "./styles/App.css"
import React, { useState, useEffect } from "react";
import getFormattedDate from './helpers/getFormattedDate';
import AddNewNoteForm from './components/AddNewNoteForm';
import CreatedNoteItem from './components/CreatedNoteItem';
import EditNoteModal from './components/EditNoteModal';


export default function App() {
  
  const [date, setDate] = useState(getFormattedDate());


  const [notesList, setNotesList] = useState([{
      title: "Hello",
      content: "What a beautiful day!",
      date: getFormattedDate(),
}])
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalId, setModalId] = useState();
    const [modalDate, setModalDate] = useState(getFormattedDate());

  useEffect(() => {
      setDate(getFormattedDate());
    }, []);

    function updateNotesList(note) {
      setNotesList((tasks) => {
        return [note, ...tasks].filter(
          (item, key, array) => 
          array.indexOf(item) === key
        );
      });
    }
  
    function deleteNote(id) {
      setNotesList((prevNotes) => {
        return prevNotes.filter((_, index) => index !== id);
      });
    }
  


    function saveNote(id, e) {
      const { innerText } = e.target;
      setNotesList((tasks) => {
        return tasks.map((note, key) => {
          if (key === id) {
            note = {
              ...note, 
              [e.target.getAttribute("data-name")]: innerText
            }
          }
          return note;
        });
      });
    }
    
    function expandNote(id, title, content, date) {
        setModalShow(true);
        setModalTitle(title);
        setModalContent(content);
        setModalId(id);
        setModalDate(getFormattedDate());
    }

      return ( 
        <div 
        className="notes-wrapper">
            <AddNewNoteForm 
            handleSubmit={updateNotesList} 
            />
                <div className="notes-grid">
                  <EditNoteModal
                    title={modalTitle}
                    content={modalContent}
                    date={modalDate}
                    id={modalId}
                    show={modalShow}
                    setModalShow={setModalShow}
                    onHide={() => setModalShow(false)}
                    saveNote={saveNote}
                    setModalDate={setModalDate}
                    />
                        <div>
                        {notesList.map((note, key) => {
                            return (
                            <CreatedNoteItem
                                expandNote={expandNote}
                                deleteNote={deleteNote}
                                id={key}
                                key={note.title + note.content}
                                title={note.title || "No title"}
                                content={note.content}
                                date={note.date}
                              />
                                    );
                            })}
                        </div>
                </div>
        </div>
      )
}