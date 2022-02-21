import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteApi from "../api/NoteApi";
import { Note } from "../components/Note";
import { INote } from '../interfaces'

export const NotePage: React.FC = () => {
    const params = useParams();
    const [note, setNote] = useState<INote>()

    const fetchData = async () => {
        const data = await NoteApi.getNoteById(params.id)
        setNote(data)
      };

    useEffect(()  => {
        fetchData()
    }, [])

    return (
        <Note 
            note={note}
        />
    );
}
