import React, { useState } from "react";

// The editor core
import Editor from '@react-page/editor';
import type { Value } from '@react-page/editor';

import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';

// Stylesheets for the rich text area plugin
// uncomment this
import '@react-page/plugins-slate/lib/index.css';
import { INote } from "../../interfaces/interfaces";
import './NoteInLineStyle.scss'

// Define which plugins we want to use.
const cellPlugins = [slate()];

type NoteInLineProps = {
    note: INote
    onRemove(noteId: string): void
}

export const NoteInLine: React.FC<NoteInLineProps> = ({note, onRemove}) => {
    const [value, setValue] = useState<Value>(JSON.parse(note.text));

    const removeClickHandler = () => {
        onRemove(note.id)
    }

    return (
        <div className="noteinline-general">
            <div className="noteinline-description">
                {note.description}
            </div>
            <div className="noteinline-text">
                <Editor 
                    value={value} 
                    cellPlugins={cellPlugins} 
                    readOnly
                />
            </div>
            <div>
                <button onClick={removeClickHandler}>Delete</button>
            </div>
        </div>
    );
}