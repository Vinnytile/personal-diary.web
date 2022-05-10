import React, { useState } from "react";
import './NewNoteFormStyle.scss'

// The editor core
import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';

// import the main css, uncomment this: (this is commented in the example because of https://github.com/vercel/next.js/issues/19717)
import '@react-page/editor/lib/index.css';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
//import image from '@react-page/plugins-image';

// Stylesheets for the rich text area plugin
// uncomment this
import '@react-page/plugins-slate/lib/index.css';
import { useNavigate } from "react-router-dom";

// Stylesheets for the imagea plugin
//import '@react-page/plugins-image/lib/index.css';

// Define which plugins we want to use.
const cellPlugins = [slate()];

type NewNoteFormProps = {
    onAdd(description: string, text: string): void
}

export const NewNoteForm: React.FC<NewNoteFormProps> = ({onAdd}) => {
    const [description, setDescription] = useState<string>('')
    const [value, setValue] = useState<Value>(null);
    const navigate = useNavigate();

    const buttonSaveClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault();
        const text = JSON.stringify(value);
        await onAdd(description, text);
        navigate('/notes');
    }

    const buttonDiscardClickHandler = (event: React.MouseEvent) => {
        navigate('/notes');
    }

    const textareaChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    return (
        <div className="w-50 general-form-newnote">
            <div className="description-newnote">
                <label htmlFor="description-textarea"> 
                    Title
                </label>
                <textarea 
                    id="description-textarea"
                    value={description}
                    onChange={event => textareaChangeHandler(event)}
                    className="form-control description-textarea-newnote"
                >
                </textarea>
            </div>

            <Editor 
                cellPlugins={cellPlugins} 
                value={value} 
                onChange={setValue}
            />

            <div>
                <button
                    onClick={event => buttonSaveClickHandler(event)}
                    className="btn btn-primary newnote-button"
                >
                    Save
                </button>
                <button
                    onClick={event => buttonDiscardClickHandler(event)}
                    className="btn btn-primary newnote-button"
                >
                    Discard
                </button>
            </div>
        </div>
    );
}
