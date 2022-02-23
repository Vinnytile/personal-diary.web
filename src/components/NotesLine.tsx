import React from "react";
import { Link } from "react-router-dom";
import { INote } from "../interfaces/interfaces";


type NotesLineProps = {
    notes: INote[]
    onRemove(noteId: string): void
}

export const NotesLine: React.FC<NotesLineProps> = ({notes, onRemove}) => {

    const removeHandler = (event: React.MouseEvent, noteId: string) => {
        event.preventDefault()
        onRemove(noteId)
    }

    return (
        <div>
            <Link to={`/newNote`}>
                <button>Go</button>
            </Link>
            <ul>
                {notes.map(note => {
                    return (
                        <li key={note.id}>
                            <p>{note.id}</p>
                            <p>{note.description}</p>
                            <p>{note.text}</p>
                            <Link to={`/note/${note.id}`}>
                                <button>Open</button>
                            </Link>
                            <button onClick={event => removeHandler(event, note.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}