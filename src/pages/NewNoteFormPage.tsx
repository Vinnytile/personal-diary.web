import React from "react";
import { NewNoteForm } from '../components/NewNoteForm/NewNoteForm'
import { INoteDTO } from "../interfaces/interfaces"
import NoteApi from '../api/NoteApi'
import JwtApi from '../api/JwtApi'

export const NewNoteFormPage: React.FC = () => {
    
    const addHandler = async (description: string, text: string): Promise<void> => {
        const userId: string = JwtApi.getUserIdFromJwt()
        const newNote: INoteDTO = {
          description: description,
          text: text,
          userId: userId
        }

        await NoteApi.createNote(newNote)
    }

    return (
        <NewNoteForm 
            onAdd={addHandler}
        />
    );
}