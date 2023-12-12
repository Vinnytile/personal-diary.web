import React, { useState } from "react";
import './NewNoteFormStyle.scss'
import { useNavigate } from "react-router-dom";

type NewNoteFormProps = {
    onAdd(description: string, text: string): void
}

export const NewNoteForm: React.FC<NewNoteFormProps> = ({onAdd}) => {
    const [description, setDescription] = useState<string>('')
    const [text, setText] = useState<string>('')
    const navigate = useNavigate();

    const buttonSaveClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault();
        await onAdd(description, text);
        navigate('/selfNotes');
    }

    const buttonDiscardClickHandler = (event: React.MouseEvent) => {
        navigate('/selfNotes');
    }

    const textareaChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const textChangeHandler = (event) => {
        setText(event.target.value);
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
            <div className="text-newnote">
                <label htmlFor="text-textarea"> 
                    Text
                </label>
                <textarea 
                    id="text-textarea"
                    value={text}
                    onChange={event => textChangeHandler(event)}
                    className="form-control text-textarea-newnote"
                >
                </textarea>
            </div>

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
