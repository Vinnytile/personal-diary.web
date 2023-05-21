import React, { useState } from "react";
import { INote } from "../../interfaces/interfaces";
import './GeneralNotePreviewStyle.scss'

type GeneralNotePreviewProps = {
    note: INote
}

export const GeneralNotePreview: React.FC<GeneralNotePreviewProps> = ({note}) => {
    const [value, setValue] = useState<string>(note.summary);

    return (
        <div className="noteinline-general">
            <div className="noteinline-description">
                {note.description}
            </div>
            <div className="noteinline-text">
                <textarea
                    id="text-textarea"
                    value={value}
                    onChange={()=>{}}
                    className="form-control text-textarea-newnote"
                    readOnly
                >
                </textarea>
            </div>
        </div>
    );
}