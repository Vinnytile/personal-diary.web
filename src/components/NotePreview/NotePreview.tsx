import React, { useEffect, useState } from "react";
import { INote } from "../../interfaces/interfaces";
import './NotePreviewStyle.scss'

type NotePreviewProps = {
    note: INote | undefined
}

export const NotePreview: React.FC<NotePreviewProps> = ({note}) => {
    const [description, setDescription] = useState<string>('')
    const [summary, setSummary] = useState<string>('')
    const [text, setText] = useState<string>('')

    useEffect(() => {
        if (note) {
            setDescription(note.description)
            setText(note.text)
            setSummary(note.summary)
        }
    }, [note]);

    return (
        <div className="w-50 general-form-notepreview">
            <div className="description-notepreview">
                <textarea 
                    id="description-textarea"
                    value={description}
                    onChange={() => {}}
                    className="form-control description-textarea-notepreview"
                    readOnly
                >
                </textarea>
            </div>
            <div className="summary-notepreview">
                <textarea 
                    id="summary-textarea"
                    value={summary}
                    onChange={() => {}}
                    className="form-control summary-textarea-notepreview"
                    readOnly
                >
                </textarea>
            </div>
            <div className="text-notepreview">
                <textarea 
                    id="text-textarea"
                    value={text}
                    onChange={() => {}}
                    className="form-control text-textarea-notepreview"
                    readOnly
                >
                </textarea>
            </div>
        </div>
    );
}
