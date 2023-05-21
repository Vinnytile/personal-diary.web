import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JwtApi from "../api/JwtApi";
import NoteApi from "../api/NoteApi";
import { NoteView } from "../components/NoteView/NoteView";
import { IGenerateNoteSummaryDTO, INote, INoteDTO } from '../interfaces/interfaces'

export const NoteViewPage: React.FC = () => {
    const params = useParams();
    const [note, setNote] = useState<INote>()

    const fetchData = async () => {
        const data = await NoteApi.getNoteById(params.id)
        setNote(data)

        return data
    };

    useEffect(()  => {
        fetchData()
    }, [])

    const generateSummaryHandler = async (noteText): Promise<string> => {
        const generateNoteSummaryDTO: IGenerateNoteSummaryDTO = {
            text: noteText
        }
        const json = JSON.stringify(generateNoteSummaryDTO);

        const summary = await NoteApi.generateNoteSummary(json);

        return summary
    }

    const saveHandler = async (description: string, text: string, summary: string): Promise<void> => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()
        const newNote: INoteDTO = {
          description: description,
          text: text,
          userIdentityFID: userIdentityId,
          summary: summary
        }

        await NoteApi.changeNote(params.id, newNote)
    }

    const deleteHandler = async () => {
        await NoteApi.deleteNote(params.id)
    }

    return (
        <NoteView note={note} onGenerateSummary={generateSummaryHandler} onSave={saveHandler} onDelete={deleteHandler}/>
    );
}
