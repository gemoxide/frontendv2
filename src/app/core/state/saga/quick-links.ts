import { takeLatest, call, put } from "redux-saga/effects";
import {
    createQuickLink,
    createQuickLinkFailure,
    createQuickLinkSuccess,
    deleteQuickLink,
    deleteQuickLinkFailure,
    deleteQuickLinkSuccess,
    getQuickLinks,
    getQuickLinksFailure,
    getQuickLinksSuccess,
    updateQuickLink,
    updateQuickLinkFailure,
    updateQuickLinkSuccess,
} from "../reducer/quick-links";
import {
    createQuickLinkRequest,
    deleteQuickLinkRequest,
    getQuickLinksRequest,
    updateQuickLinkRequest,
} from "../../services/quick-links/quick-links.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetQuickLinksQuery } from "../../interfaces/quick-links.interface";

function* getQuickLinksSaga(actions: PayloadAction<GetQuickLinksQuery>) {
    try {
        const data: AxiosResponse = yield call(
            getQuickLinksRequest,
            actions.payload.organization_id,
            actions.payload.query
        );
        yield put(getQuickLinksSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getQuickLinksFailure.type, true);
    }
}

function* createQuickLinkSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createQuickLinkRequest,
            actions.payload
        );
        yield put(createQuickLinkSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createQuickLinkFailure.type,
            true
        );
    }
}

function* updateQuickLinkSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateQuickLinkRequest,
            actions.payload
        );
        yield put(updateQuickLinkSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateQuickLinkFailure.type,
            true
        );
    }
}

function* deleteQuickLinkSaga(
    actions: PayloadAction<{ organization_id: string; id: string }>
) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteQuickLinkRequest,
            actions.payload.organization_id,
            actions.payload.id
        );
        yield put(deleteQuickLinkSuccess({ ...data, id: actions.payload.id }));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteQuickLinkFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(getQuickLinks.type, getQuickLinksSaga);
    yield takeLatest(createQuickLink.type, createQuickLinkSaga);
    yield takeLatest(updateQuickLink.type, updateQuickLinkSaga);
    yield takeLatest(deleteQuickLink.type, deleteQuickLinkSaga);
}
