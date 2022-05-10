import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JwtApi from "../api/JwtApi";
import NoteApi from "../api/NoteApi";
import { NoteView } from "../components/NoteView/NoteView";
import { INote, INoteDTO } from '../interfaces/interfaces'

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

    const saveHandler = async (description: string, text: string): Promise<void> => {
        const userId: string = JwtApi.getUserIdFromJwt()
        const newNote: INoteDTO = {
          description: description,
          text: text,
          userId: userId
        }

        await NoteApi.changeNote(params.id, newNote)
    }

    return (
        <NoteView note={note} onSave={saveHandler}/>
    );
}
