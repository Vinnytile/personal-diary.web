import React from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../interfaces/interfaces";
import { NotePreview } from "../NotePreview/NotePreview";
import './GeneralNotesLineStyle.scss'


type GeneralNotesLineProps = {
    notes: INote[]
}

export const GeneralNotesLine: React.FC<GeneralNotesLineProps> = ({notes}) => {
    const navigate = useNavigate();

    const noteClickHandler = (noteId: string) => {
        //navigate(`/note/${noteId}`);
    }

    return (
        <div className="generalnotesline-main">
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