import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { INote } from "../../interfaces/interfaces";
import AuthApi from '../../api/AuthApi'
import { NoteInLine } from "./NoteInLine";
import './NotesLineStyle.scss'


type NotesLineProps = {
    notes: INote[]
    onRemove(noteId: string): void
}

export const NotesLine: React.FC<NotesLineProps> = ({notes, onRemove}) => {
    const navigate = useNavigate();

    const removeHandler = (noteId: string) => {
        onRemove(noteId)
    }

    const logoutClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        AuthApi.logout();
    }

    const noteClickHandler = (noteId: string) => {
        navigate(`/note/${noteId}`);
    }

    return (
        <div>
            <p>
                <Link to={`/newNote`}>
                    <button>New Note</button>
                </Link>
            </p>
            <p>
                <Link to={`/register`}>
                    <button>Register</button>
                </Link>
            </p>
            <button
                type="button"
                onClick={event => logoutClickHandler(event)}
            >
                Logout
            </button>
            <ul>
                {notes.map(note => {
                    return (
                        <li key={note.id} onClick={event => noteClickHandler(note.id)} className="notesline-li">
                            <NoteInLine note={note} onRemove={removeHandler}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}