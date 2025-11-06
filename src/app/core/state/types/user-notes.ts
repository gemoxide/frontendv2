import { PayloadAction } from "@reduxjs/toolkit";
import {
    CreateUserNoteParam,
    GetUserNotesQuery,
    IUserNote,
    IUserNoteResponse,
} from "../../interfaces/user-notes.interface";
import { LoadingResult } from "../../interfaces/common.interface";

export interface UserNotes {
    getUserNotes: GetUserNotes;
    createUserNote: CreateNote;
    deleteUserNote: DeleteUserNote;
    updateUserNote: UpdateUserNote;
}

export type GetUserNotes = LoadingResult & {
    data?: IUserNoteResponse;
};

export type GetUserNotesRequestActionPayload = PayloadAction<GetUserNotesQuery>;

export type CreateNote = LoadingResult & {
    data?: IUserNote;
};

export type CreateUserNoteRequestActionPayload =
    PayloadAction<CreateUserNoteParam>;

export type UpdateUserNote = LoadingResult & {
    data?: IUserNote;
};

export type DeleteUserNote = LoadingResult;
