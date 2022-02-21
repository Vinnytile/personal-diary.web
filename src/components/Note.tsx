import React from "react";
import { INote } from "../interfaces";

type NoteProps = {
    note: INote | undefined
}

export const Note: React.FC<NoteProps> = ({note}) => {
    return (
        <div>
            <p>{note?.id}</p>
            <p>{note?.description}</p>
            <p>{note?.text}</p>
        </div>
    );
}
