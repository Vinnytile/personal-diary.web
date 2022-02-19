import axios from "axios";
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

    return (
        <NotesLine 
            notes={notes}
        />
    );
}
