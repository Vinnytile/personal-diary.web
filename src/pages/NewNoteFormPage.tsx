import React from "react";
import { NewNoteForm } from '../components/NewNoteForm/NewNoteForm'
import { IGenerateNoteSummaryDTO, INoteDTO } from "../interfaces/interfaces"
import NoteApi from '../api/NoteApi'
import JwtApi from '../api/JwtApi'

export const NewNoteFormPage: React.FC = () => {
    
    const generateSummaryHandler = async (noteText): Promise<string> => {
        const generateNoteSummaryDTO: IGenerateNoteSummaryDTO = {
            text: noteText
        }
        const json = JSON.stringify(generateNoteSummaryDTO);

        const summary = await NoteApi.generateNoteSummary(json);

        return summary
    }
    
    const addHandler = async (description: string, text: string, summary: string): Promise<void> => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()
        const newNote: INoteDTO = {
          description: description,
          text: text,
          userIdentityFID: userIdentityId,
          summary: summary
        }

        await NoteApi.createNote(newNote)
    }

    return (
        <NewNoteForm
            onGenerateSummary={generateSummaryHandler}
            onAdd={addHandler}
        />
    );
}