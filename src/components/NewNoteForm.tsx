import React, { useRef } from "react";
import { Link } from "react-router-dom";

type NewNoteFormProps = {
    onAdd(description: string, text: string): void
}

export const NewNoteForm: React.FC<NewNoteFormProps> = ({onAdd}) => {
    const refDescription = useRef<HTMLInputElement>(null)
    const refText = useRef<HTMLInputElement>(null)

    const buttonClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        onAdd(refDescription.current!.value, refText.current!.value)
        refDescription.current!.value = ''
        refText.current!.value = ''
    }


    return (
        <div>
            <input
                ref={refDescription} 
                type="text" 
                id="description" 
                placeholder="Input"
            />
            <label htmlFor="description"> 
                Input Decription
            </label>
            <input
                ref={refText}
                type="text"
                id="text"
                placeholder="Input"
            />
            <label htmlFor="text"> 
                Input Text
            </label>
            <button
                type="button"
                onClick={event => buttonClickHandler(event)}
            >
                Submit
            </button>
            <Link to={`/`}>
                <button>Go Back</button>
            </Link>
        </div>
    );
}