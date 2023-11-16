import "./styles/App.css"
import React, { useState, useEffect } from "react";
import localForage from 'localforage'
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
    const [modalShow, setmodalshow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalId, setModalId] = useState();
    const [modalDate, setmodaldate] = useState(getFormattedDate());

  useEffect(() => {
      setDate(getFormattedDate());
    }, []);

  useEffect(() => {
      localForage.getItem('notes').then((storedNotes) => {
        if (storedNotes) {
          setNotesList(storedNotes);
        }
      });
    }, []);

    function updateNotesList(note) {
      setNotesList((tasks) => {
        const updatedNotes = [note, ...tasks].filter(
          (item, key, array) => array.indexOf(item) === key
        );
        localForage.setItem('notes', updatedNotes);
        return updatedNotes;
      });
    }
  
    function deleteNote(id) {
      setNotesList((prevNotes) => {
        const updatedNotes = prevNotes.filter((_, index) => index !== id);
      
        localForage.setItem('notes', updatedNotes);
        return updatedNotes;
      });
    }

    function expandNote(id, title, content, date) {
      setmodalshow(true);
      setModalTitle(title);
      setModalContent(content);
      setModalId(id);
      setmodaldate(date);
    }

    function savenote(id, e) {
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
                    setmodalshow={setmodalshow}
                    onHide={() => setmodalshow(false)}
                    savenote={(id, e) => {
                      const { innerText } = e.target;
                      setNotesList((tasks) => {
                        const updatedNotes = tasks.map((note, key) => {
                          if (key === id) {
                            note = {
                              ...note,
                              [e.target.getAttribute('data-name')]: innerText,
                            };
                          }
                          return note;
                        });
                        localForage.setItem('notes', updatedNotes);
                        return updatedNotes;
                      });
                    }}
                    setmodaldate={setmodaldate}
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