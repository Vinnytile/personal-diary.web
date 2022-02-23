import { INote, INoteDTO } from "../interfaces/interfaces";
import Api from "./Api";

const getNotes = async (): Promise<INote[]> => {
    const response = await Api.get('notes');

    return response.data;
};

const getNoteById = async (noteId: string | undefined): Promise<INote> => {
    const response = await Api.get(`notes/${noteId}`);

    return response.data;
}

const createNote = async (newNote: INoteDTO) => {
    const response = await Api.post(`notes`, newNote);

    return response.data;
}

const deleteNote = async (noteId: string | undefined): Promise<void> => {
    const response = await Api.remove(`notes/${noteId}`);

    console.log(response)
}

const exportedObject = {
    getNotes,
    getNoteById,
    createNote,
    deleteNote
};

export default exportedObject;
