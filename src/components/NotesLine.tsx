import React from "react";
import { INote } from "../interfaces";


type NotesLineProps = {
    notes: INote[]
}

export const NotesLine: React.FC<NotesLineProps> = ({notes}) => {

    return (
        <ul>
            {notes.map(note => {
                return (
                    <li key={note.id}>
                        <p>{note.id}</p>
                        <p>{note.desciption}</p>
                        <p>{note.text}</p>
                    </li>
                )
            })}
        </ul>
    );
}