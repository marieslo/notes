import "../styles/CreatedNoteItem.css"
import "../styles/App.css"

export default function CreatedNoteItem (props) {
 
  return (
    <div 
    className="note-item">
    <div
      onClick={() => 
        props.expandNote
        (props.id, 
          props.title, 
          props.content, 
          props.date)}>
          <h4 
          className="title"
          name="title">
            {props.title}</h4>
            <p 
            className="textarea-content-note-item"
            name="content">
              {props.content}</p>
              <div 
                className="date"
                name="date">
                {props.date}
              </div>
      </div>
        <button
                  className="delete-note-btn"
                  onClick={() => 
                    {const deleteConfirmation = 
                      confirm("Are you sure you want to delete your note?");
                    if (deleteConfirmation) {
                      props.deleteNote(props.id);
                    }
                  }}
          >x</button>
</div>
  );
}