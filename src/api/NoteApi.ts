import { INote, INoteDTO } from "../interfaces/interfaces";
import Api from "./Api";

const getNotes = async (userIdentityId: string | undefined): Promise<INote[]> => {
    const response = await Api.get(`notes/${userIdentityId}`);

    return response.data;
};

const getObservedNotes = async (userIdentityId: string | undefined): Promise<INote[]> => {
    const response = await Api.get(`notes/observed/${userIdentityId}`);

    return response.data;
};

const getNoteById = async (noteId: string | undefined): Promise<INote> => {
    const response = await Api.get(`notes/note/${noteId}`);

    return response.data;
}

const createNote = async (newNote: INoteDTO) => {
    const response = await Api.post(`notes`, newNote);

    return response.data;
}

const changeNote = async (id: string, note: INoteDTO) => {
    const response = await Api.put(`notes/${id}`, note);

    return response.data;
} 

const deleteNote = async (noteId: string | undefined): Promise<void> => {
    const response = await Api.remove(`notes/${noteId}`);
}

const generateNoteSummary = async (noteJson: string) => {
    const response = await Api.postPython(`summarize`, noteJson);
    //const response = await Api.getPython(`test`);

    return response.data;
}

const exportedObject = {
    getNotes,
    getObservedNotes,
    getNoteById,
    createNote,
    changeNote,
    deleteNote,
    generateNoteSummary
};

export default exportedObject;
