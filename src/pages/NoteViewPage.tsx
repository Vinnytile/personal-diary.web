import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JwtApi from "../api/JwtApi";
import NoteApi from "../api/NoteApi";
import { NoteView } from "../components/NoteView/NoteView";
import { IGenerateNoteSummaryDTO, INote, INoteDTO } from '../interfaces/interfaces'
import { SentimentsTypes } from "../interfaces/enums";
import TextAnalysisApi from "../api/TextAnalysisApi";

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

    const generateSummary = async (noteText): Promise<string> => {
        const generateNoteSummaryDTO: IGenerateNoteSummaryDTO = {
            text: noteText
        }
        const json = JSON.stringify(generateNoteSummaryDTO);

        const summary = await TextAnalysisApi.generateNoteSummary(json);

        return summary
    }

    const generateSentiments = async (noteText): Promise<SentimentsTypes> => {
        const generateNoteSummaryDTO: IGenerateNoteSummaryDTO = {
            text: noteText
        }
        const json = JSON.stringify(generateNoteSummaryDTO);

        var sentiments: SentimentsTypes;
        const raw_sentiments = await TextAnalysisApi.generateNoteSentiments(json);

        if (raw_sentiments.neg > 0.5) {
            sentiments = SentimentsTypes.Negative;
        }
        else if (raw_sentiments.pos > 0.5) {
            sentiments = SentimentsTypes.Positive;
        }
        else if (raw_sentiments.neu > 0.5) {
            sentiments = SentimentsTypes.Neutral;
        }

        return sentiments;
    }

    const generateNamedEntities = async (noteText): Promise<string> => {
        const generateNoteSummaryDTO: IGenerateNoteSummaryDTO = {
            text: noteText
        }
        const json = JSON.stringify(generateNoteSummaryDTO);

        const namedEntities = await TextAnalysisApi.generateNoteNamedEntities(json);

        return JSON.stringify(namedEntities);
    }

    const saveHandler = async (description: string, text: string): Promise<void> => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()

        const summary = await generateSummary(text);
        const sentiments = await generateSentiments(text);
        const namedEntities = await generateNamedEntities(text);

        const newNote: INoteDTO = {
          description: description,
          text: text,
          userIdentityFID: userIdentityId,
          summary: summary,
          sentiments: sentiments,
          namedEntities: namedEntities
        }

        await NoteApi.changeNote(params.id, newNote)
    }

    const deleteHandler = async () => {
        await NoteApi.deleteNote(params.id)
    }

    return (
        <NoteView note={note} onSave={saveHandler} onDelete={deleteHandler}/>
    );
}
