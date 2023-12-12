import Api from "./Api";

const generateNoteSummary = async (noteJson: string) => {
    const response = await Api.postPython(`summarize`, noteJson);

    return response.data;
}

const generateNoteSentiments = async(noteJson: string) => {
    const response = await Api.postPython(`sentiments`, noteJson);

    return response.data;
}

const generateNoteNamedEntities = async(noteJson: string) => {
    const response = await Api.postPython(`namedentities`, noteJson);

    return response.data;
}

const exportedObject = {
    generateNoteSummary,
    generateNoteSentiments,
    generateNoteNamedEntities
};

export default exportedObject;