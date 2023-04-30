import React, { useEffect, useState } from "react";
import { INote } from "../../interfaces/interfaces";
import './NoteViewStyle.scss'
import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';
import '@react-page/editor/lib/index.css';
import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import { useNavigate } from "react-router-dom";

const cellPlugins = [slate()];

type NoteProps = {
    note: INote | undefined
    onSave(description: string, text: string): void
    onDelete(): void
}

export const NoteView: React.FC<NoteProps> = ({note, onSave, onDelete}) => {
    const [description, setDescription] = useState<string>('')
    const [text, setText] = useState<Value>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (note) {
            setDescription(note.description)
            setText(JSON.parse(note.text))
        }
    }, [note]);

    const textareaChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const buttonSaveClickHandler = async (event) => {
        const textJson = JSON.stringify(text);
        await onSave(description, textJson);
    }

    const buttonDiscardClickHandler = (event: React.MouseEvent) => {
        navigate('/selfNotes');
    }

    const buttonDeleteClickHandler = async (event: React.MouseEvent) => {
        await onDelete();
        navigate('/selfNotes');
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
                    onClick={event => buttonDiscardClickHandler(event)}
                    className="btn btn-primary noteview-button"
                >
                    Discard changes
                </button>
                <button
                    onClick={event => buttonDeleteClickHandler(event)}
                    className="btn btn-primary noteview-button"
                >
                    Delete
                </button>
            </div>
            </div>
        </div>
    );
}
