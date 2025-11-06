import { takeLatest, call, put } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { CreateBoardRequestActionPayload, GetBoardsRequestActionPayload } from "../types/boards";
import { createBoardRequest, deleteBoardRequest, getBoardRequest, getBoardsRequest, updateBoardRequest } from "../../services/boards/boards.service";
import { createBoard, createBoardFailure, createBoardSuccess, deleteBoard, deleteBoardFailure, deleteBoardSuccess, getBoard, getBoardFailure, getBoardSuccess, getBoards, getBoardsFailure, getBoardsSuccess, updateBoard, updateBoardFailure, updateBoardSuccess } from "../reducer/boards";

function* getBoardsSaga(actions: GetBoardsRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getBoardsRequest,
            actions.payload
        );
        yield put(getBoardsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getBoardsFailure.type, true);
    }
}

function* createBoardSaga(actions: CreateBoardRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            createBoardRequest,
            actions.payload
        );
        yield put(createBoardSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createBoardFailure.type, true);
    }
}

function* updateBoardSaga(actions: CreateBoardRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            updateBoardRequest,
            actions.payload
        );
        yield put(updateBoardSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateBoardFailure.type, true);
    }
}

function* getBoardSaga(actions: PayloadAction<number>) {
    try {
        const { data }: AxiosResponse = yield call(
            getBoardRequest,
            actions.payload
        );
        yield put(getBoardSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getBoardFailure.type, true);
    }
}

function* deleteBoardSaga(actions: PayloadAction<number>) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteBoardRequest,
            actions.payload
        );
        yield put(deleteBoardSuccess({ ...data, id: actions.payload }));
    } catch (err: any) {
        yield call(handleServerException, err, deleteBoardFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getBoards.type, getBoardsSaga);
    yield takeLatest(createBoard.type, createBoardSaga);
    yield takeLatest(updateBoard.type, updateBoardSaga);
    yield takeLatest(getBoard.type, getBoardSaga);
    yield takeLatest(deleteBoard.type, deleteBoardSaga);
}
