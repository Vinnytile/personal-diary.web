import React, { useEffect, useState } from "react";
import { NotesLine } from '../components/NotesLine'
import { INote } from "../interfaces";
import NoteApi from '../api/NoteApi'

export const NotesLinePage: React.FC = () => {
    const [notes, setNotes] = useState<INote[]>([])

    const fetchData = async () => {
        const data = await NoteApi.getNotes()

        setNotes(data)
    };

    useEffect(()  => {
        fetchData()
    }, [])

    const removeHandler = async (noteId: string) => {
        await NoteApi.deleteNote(noteId)
        await fetchData()
    }

    return (
            <NotesLine 
                notes={notes}
                onRemove={removeHandler}
            />
    );
}
