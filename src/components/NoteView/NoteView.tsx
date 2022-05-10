import React, { useEffect, useState } from "react";
import { INote } from "../../interfaces/interfaces";
import './NoteViewStyle.scss'

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

type NoteProps = {
    note: INote | undefined
    onSave(description: string, text: string): void
}

export const NoteView: React.FC<NoteProps> = ({note, onSave}) => {
    const [description, setDescription] = useState<string>('')
    const [text, setText] = useState<Value>(null);
    const [prevDescription, setPrevDescription] = useState<string>('')
    const [prevText, setPrevText] = useState<Value>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (note) {
            setDescription(note.description)
            setText(JSON.parse(note.text))
            setPrevDescription(note.description)
            setPrevText(JSON.parse(note.text))
        }
    }, [note]);

    const textareaChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const buttonSaveClickHandler = async (event) => {
        const textJson = JSON.stringify(text);
        await onSave(description, textJson);
    }

    return (
        <div className="w-50 general-form-noteview">
            <div className="description-noteview">
                <textarea 
                    id="description-textarea"
                    value={description}
                    onChange={event => textareaChangeHandler(event)}
                    className="form-control description-textarea-noteview"
                >
                </textarea>
            </div>

            <Editor 
                cellPlugins={cellPlugins} 
                value={text} 
                onChange={setText}
            />

            <div>
            <div>
                <button
                    onClick={event => buttonSaveClickHandler(event)}
                    className="btn btn-primary noteview-button"
                >
                    Save
                </button>
                <button
                    //onClick={event => buttonDiscardClickHandler(event)}
                    className="btn btn-primary noteview-button"
                >
                    Discard changes
                </button>
            </div>
            </div>
        </div>
    );
}
