import React from "react";
import { NewNoteForm } from '../components/NewNoteForm'
import { INoteDTO } from "../interfaces"
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

        JwtApi.getUserIdFromJwt()

        await NoteApi.createNote(newNote)
    }

    return (
        <NewNoteForm 
            onAdd={addHandler}
        />
    );
}