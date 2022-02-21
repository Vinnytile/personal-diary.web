import React from "react";
import { NewNoteForm } from '../components/NewNoteForm'
import { INoteDTO } from "../interfaces"
import NoteApi from '../api/NoteApi'

export const NewNoteFormPage: React.FC = () => {
    
    const addHandler = async (description: string, text: string): Promise<void> => {
        const newNote: INoteDTO = {
          description: description,
          text: text,
          userId: '90d5e52a-96a5-40a8-4313-08d9e1a9f18a'
        }

        await NoteApi.createNote(newNote)
    }

    return (
        <NewNoteForm 
            onAdd={addHandler}
        />
    );
}