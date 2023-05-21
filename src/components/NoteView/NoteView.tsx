import React, { useEffect, useState } from "react";
import { INote } from "../../interfaces/interfaces";
import './NoteViewStyle.scss'
import { useNavigate } from "react-router-dom";

type NoteProps = {
    note: INote | undefined
    onGenerateSummary(text: string): Promise<string>
    onSave(description: string, text: string, summary: string): void
    onDelete(): void
}

export const NoteView: React.FC<NoteProps> = ({note, onGenerateSummary, onSave, onDelete}) => {
    const [description, setDescription] = useState<string>('')
    const [summary, setSummary] = useState<string>('')
    const [text, setText] = useState<string>('')
    const navigate = useNavigate();

    useEffect(() => {
        if (note) {
            setDescription(note.description)
            setText(note.text)
            setSummary(note.summary)
        }
    }, [note]);

    const textareaChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const textChangeHandler = (event) => {
        setText(event.target.value);
    }

    const buttonGenerateSummaryClickHandler = async (event) => {
        await onSave(description, text, summary);

        const summaryText = await onGenerateSummary(text);
        setSummary(summaryText);

        await onSave(description, text, summaryText);
    }

    const buttonSaveClickHandler = async (event) => {
        await onSave(description, text, summary);
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
            <div className="summary-noteview">
                <textarea 
                    id="summary-textarea"
                    value={summary}
                    onChange={()=>{}}
                    className="form-control summary-textarea-noteview"
                >
                </textarea>
            </div>
            <div>
                <button
                    onClick={event => buttonGenerateSummaryClickHandler(event)}
                    className="btn btn-primary noteview-button"
                >
                    Generate summary
                </button>
            </div>
            <div className="text-noteview">
                <textarea 
                    id="text-textarea"
                    value={text}
                    onChange={event => textChangeHandler(event)}
                    className="form-control text-textarea-noteview"
                >
                </textarea>
            </div>

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
