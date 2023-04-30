import React, { useEffect, useState } from "react";
import { SelfNotesLine } from '../components/SelfNotesLine/SelfNotesLine'
import { INote } from "../interfaces/interfaces";
import NoteApi from '../api/NoteApi'
import JwtApi from "../api/JwtApi";
import { useNavigate } from "react-router-dom";

export const SelfNotesLinePage: React.FC = () => {
    const [notes, setNotes] = useState<INote[]>([])
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const userIdentityId: string = JwtApi.getUserIdFromJwt()
            const data = await NoteApi.getNotes(userIdentityId)

            setNotes(data)
        }
        catch (error) {
            navigate('/loginSwitcher');
        }
    };

    useEffect(()  => {
        fetchData()
    }, [])

    const removeHandler = async (noteId: string) => {
        await NoteApi.deleteNote(noteId)
        await fetchData()
    }

    return (
            <SelfNotesLine 
                notes={notes}
                onRemove={removeHandler}
            />
    );
}
