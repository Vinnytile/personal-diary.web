import React, { useEffect, useState } from "react";
import { GeneralNotesLine } from '../components/GeneralNotesLine/GeneralNotesLine'
import { INote } from "../interfaces/interfaces";
import NoteApi from '../api/NoteApi'
import JwtApi from "../api/JwtApi";
import { useNavigate } from "react-router-dom";

export const GeneralNotesLinePage: React.FC = () => {
    const [notes, setNotes] = useState<INote[]>([])
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const userIdentityId: string = JwtApi.getUserIdFromJwt()
            const data = await NoteApi.getObservedNotes(userIdentityId)

            setNotes(data)
        }
        catch (error) {
            navigate('/login');
        }
    };

    useEffect(()  => {
        fetchData()
    }, [])

    return (
            <GeneralNotesLine 
                notes={notes}
            />
    );
}
