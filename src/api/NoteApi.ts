import { INote, INoteDTO } from "../interfaces/interfaces";
import Api from "./Api";

const getNotes = async (userIdentityId: string | undefined): Promise<INote[]> => {
    const response = await Api.get(`notes/${userIdentityId}`);

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

const exportedObject = {
    getNotes,
    getNoteById,
    createNote,
    changeNote,
    deleteNote
};

export default exportedObject;
