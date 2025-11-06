import { PayloadAction } from "@reduxjs/toolkit";
import {
    CreateNoteParam,
    GetNotesQuery,
    INote,
    INoteResponse,
} from "../../interfaces/notes.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface Notes {
    getNotes: GetNotes;
    createNote: CreateNote;
    deleteNote: DeleteNote;
    updateNote: UpdateNote;
}

export type GetNotes = LoadingResult & {
    data?: INoteResponse;
};

export type GetNotesRequestActionPayload = PayloadAction<GetNotesQuery>;

export type CreateNote = LoadingResult & {
    data?: INote;
};

export type CreateNoteRequestActionPayload = PayloadAction<CreateNoteParam>;

export type UpdateNote = LoadingResult & {
    data?: INote;
};

export type DeleteNote = LoadingResult;
