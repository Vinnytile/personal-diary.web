import React from "react";
import { useNavigate } from "react-router-dom";
import { INote } from "../../interfaces/interfaces";
import { GeneralNotePreview } from "../GeneralNotePreview/GeneralNotePreview";
import './GeneralNotesLineStyle.scss'


type GeneralNotesLineProps = {
    notes: INote[]
}

export const GeneralNotesLine: React.FC<GeneralNotesLineProps> = ({notes}) => {
    const navigate = useNavigate();

    const noteClickHandler = (noteId: string) => {
        navigate(`/notepreview/${noteId}`);
    }

    return (
        <div className="generalnotesline-main">
            <ul>
                {notes.map(note => {
                    return (
                        <li key={note.id} onClick={event => noteClickHandler(note.id)} className="notesline-li">
                            <GeneralNotePreview note={note}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}