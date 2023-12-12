import React from "react";
import { NewNoteForm } from '../components/NewNoteForm/NewNoteForm'
import { IGenerateNoteSummaryDTO, INoteDTO } from "../interfaces/interfaces"
import NoteApi from '../api/NoteApi'
import JwtApi from '../api/JwtApi'
import { SentimentsTypes } from "../interfaces/enums";
import TextAnalysisApi from "../api/TextAnalysisApi";

export const NewNoteFormPage: React.FC = () => {
    
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

        return namedEntities;
    }
    
    const addHandler = async (description: string, text: string): Promise<void> => {
        const userIdentityId: string = JwtApi.getUserIdFromJwt()

        const summary = await generateSummary(text);
        const sentiments = await generateSentiments(text);
        const namedNetities = await generateNamedEntities(text);
        const jsonNamedNetities = JSON.stringify(namedNetities);

        const newNote: INoteDTO = {
          description: description,
          text: text,
          userIdentityFID: userIdentityId,
          summary: summary,
          sentiments: sentiments,
          namedEntities: jsonNamedNetities
        }

        await NoteApi.createNote(newNote)
    }

    return (
        <NewNoteForm
            onAdd={addHandler}
        />
    );
}