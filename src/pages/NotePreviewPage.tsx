import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteApi from "../api/NoteApi";
import { NotePreview } from "../components/NotePreview/NotePreview";
import { INote } from "../interfaces/interfaces";

export const NotePreviewPage: React.FC = () => {
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

    return (
        <NotePreview note={note}/>
    );
}
