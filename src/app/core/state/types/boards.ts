import { PayloadAction } from "@reduxjs/toolkit";
import { IMetaQuery, LoadingResult } from "../../interfaces/common.interface";
import { CreateBoardParam, IBoard, IBoardResponse } from "../../interfaces/boards.interface";

export interface Boards {
    getBoards: GetBoards;
    createBoard: GetBoard;
    deleteBoard: LoadingResult;
    updateBoard: GetBoard;
    getBoard: GetBoard;
}

export type GetBoards = LoadingResult & {
    data?: IBoardResponse;
};

export type GetBoardsRequestActionPayload = PayloadAction<IMetaQuery>;

export type GetBoard = LoadingResult & {
    data?: IBoard;
};

export type CreateBoardRequestActionPayload = PayloadAction<CreateBoardParam>;

