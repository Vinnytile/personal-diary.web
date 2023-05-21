import React, { useState } from "react";
import './NewNoteFormStyle.scss'
import { useNavigate } from "react-router-dom";

type NewNoteFormProps = {
    onGenerateSummary(text: string): Promise<string>
    onAdd(description: string, text: string, summary: string): void
}

export const NewNoteForm: React.FC<NewNoteFormProps> = ({onGenerateSummary, onAdd}) => {
    const [description, setDescription] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [summary, setSummary] = useState<string>('')
    const navigate = useNavigate();

    const buttonGenerateSummaryClickHandler = async (event) => {
        await onAdd(description, text, summary);

        const summaryText = await onGenerateSummary(text);
        setSummary(summaryText);

        await onAdd(description, text, summaryText);
    }

    const buttonSaveClickHandler = async (event: React.MouseEvent) => {
        event.preventDefault();
        await onAdd(description, text, summary);
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
            <div className="summary-newnote">
                <label htmlFor="summary-textarea"> 
                    Summary
                </label>
                <textarea 
                    id="summary-textarea"
                    value={summary}
                    onChange={()=>{}}
                    className="form-control summary-textarea-newnote"
                >
                </textarea>
                <button
                    onClick={event => buttonGenerateSummaryClickHandler(event)}
                    className="btn btn-primary newnote-button"
                >
                    Generate summary
                </button>
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
