import React, { useState } from "react";
import { INote } from "../../interfaces/interfaces";
import './GeneralNotePreviewStyle.scss'
import { SentimentsTypes } from "../../interfaces/enums";
import _ from "lodash";

type GeneralNotePreviewProps = {
    note: INote
}

export const GeneralNotePreview: React.FC<GeneralNotePreviewProps> = ({note}) => {

    var sentiments = '';
    switch(note.sentiments) {
        case SentimentsTypes.Negative: { 
            sentiments = 'negative'; 
            break; 
        }
        case SentimentsTypes.Neutral: { 
            sentiments = 'neutral'; 
            break; 
        }
            case SentimentsTypes.Positive: { 
            sentiments = 'positive'; 
            break; 
        }
        default: { 
            sentiments = 'neutral'; 
            break; 
        }
    }

    const entityDictionary = _.invertBy(JSON.parse(note.namedEntities));
    var text = '';
    var entityArray = Object.entries(entityDictionary);;
    entityArray.forEach(element => {
        const key = element[0];
        const value = element[1];
        var valueString = '';
        value.forEach(el => {
            valueString = valueString + el.toString() + '; '
        })
        text = text + key.toString() + ':\t' + valueString + '\n';
    })

    return (
        <div className="noteinline-general">
            <div className="noteinline-description">
                {note.description}
            </div>
            <div className="noteinline-text">
                <textarea
                    id="text-textarea"
                    value={note.summary}
                    onChange={()=>{}}
                    className="form-control text-textarea-noteinline"
                    readOnly
                >
                </textarea>
            </div>
            <div className="noteinline-sentiments">
                <span>Sentiments:</span>
                <div className={`noteinline-sentiments-block sentiments-${sentiments}`}></div>
            </div>
            <div className="noteinline-namedentities">
                <span className="noteinline-namedentities-text">Entities in post:</span>
                <textarea
                    id="namedentities-textarea"
                    value={text}
                    onChange={()=>{}}
                    className="form-control text-textarea-namedentities"
                    readOnly>

                </textarea>
            </div>
        </div>
    );
}