import React, { useState } from "react";
import Editor from '@react-page/editor';
import type { Value } from '@react-page/editor';
import '@react-page/editor/lib/index.css';
import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import { INote } from "../../interfaces/interfaces";
import './NotePreviewStyle.scss'

const cellPlugins = [slate()];

type NotePreviewProps = {
    note: INote
}

export const NotePreview: React.FC<NotePreviewProps> = ({note}) => {
    const [value, setValue] = useState<Value>(JSON.parse(note.text));

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
        </div>
    );
}