import React from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../interfaces/interfaces";
import { NotePreview } from "../NotePreview/NotePreview";
import './SelfNotesLineStyle.scss'


type SelfNotesLineProps = {
    notes: INote[]
    onRemove(noteId: string): void
}

export const SelfNotesLine: React.FC<SelfNotesLineProps> = ({notes, onRemove}) => {
    const navigate = useNavigate();

    const createNewNoteClickHandler = () => {
        navigate(`/newNote`);
    }

    const noteClickHandler = (noteId: string) => {
        navigate(`/note/${noteId}`);
    }

    return (
        <div>
            <div className="create-form">
                <button 
                    onClick={createNewNoteClickHandler}
                    className="btn btn-success create-button"
                >
                    Create new note
                </button>
            </div>
            <ul>
                {notes.map(note => {
                    return (
                        <li key={note.id} onClick={event => noteClickHandler(note.id)} className="notesline-li">
                            <NotePreview note={note}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}