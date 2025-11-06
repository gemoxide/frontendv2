import { takeLatest, call, put } from "redux-saga/effects";
import {
    createPresentationDeck,
    createPresentationDeckFailure,
    createPresentationDeckSuccess,
    deletePresentationDeck,
    deletePresentationDeckFailure,
    deletePresentationDeckSuccess,
    getPresentationDeck,
    getPresentationDeckFailure,
    getPresentationDecks,
    getPresentationDecksFailure,
    getPresentationDecksSuccess,
    getPresentationDeckSuccess,
    updatePresentationDeck,
    updatePresentationDeckFailure,
    updatePresentationDeckStatus,
    updatePresentationDeckStatusFailure,
    updatePresentationDeckStatusSuccess,
    updatePresentationDeckSuccess,
    createPresentationDeckSlides,
    createPresentationDeckSlidesFailure,
    createPresentationDeckSlidesSuccess,
    updateAdminPresentationDeckStatusSuccess,
    updateAdminPresentationDeckStatusFailure,
    updateAdminPresentationDeckStatus,
    clonePresentationDeckSuccess,
    clonePresentationDeckFailure,
    clonePresentationDeck
} from "../reducer/presentation-decks";
import {
    createPresentationDeckRequest,
    deletePresentationDeckRequest,
    getPresentationDeckRequest,
    getPresentationDecksRequest,
    updatePresentationDeckRequest,
    updatePresentationDeckStatusRequest,
    createPresentationDeckSlidesRequest,
    updateAdminPresentationDeckStatusRequest,
    clonePresentationDeckRequest
} from "../../services/presentation-decks/presentation-decks.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getPresentationDecksSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getPresentationDecksRequest,
            actions.payload
        );
        yield put(getPresentationDecksSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getPresentationDecksFailure.type, true);
    }
}

function* createPresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createPresentationDeckRequest,
            actions.payload
        );
        yield put(createPresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createPresentationDeckFailure.type, true);
    }
}

function* clonePresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            clonePresentationDeckRequest,
            actions.payload
        );
        yield put(clonePresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, clonePresentationDeckFailure.type, true);
    }
}

function* createPresentationDeckSlidesSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createPresentationDeckSlidesRequest,
            actions.payload
        );
        yield put(createPresentationDeckSlidesSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createPresentationDeckSlidesFailure.type, true);
    }
}

function* deletePresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deletePresentationDeckRequest,
            actions.payload
        );
        yield put(deletePresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, deletePresentationDeckFailure.type, true);
    }
}

function* updatePresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updatePresentationDeckRequest,
            actions.payload
        );
        yield put(updatePresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updatePresentationDeckFailure.type, true);
    }
}

function* updatePresentationDeckStatusSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updatePresentationDeckStatusRequest,
            actions.payload
        );
        yield put(updatePresentationDeckStatusSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updatePresentationDeckStatusFailure.type, true);
    }
}

function* updateAdminPresentationDeckStatusSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateAdminPresentationDeckStatusRequest,
            actions.payload
        );
        yield put(updateAdminPresentationDeckStatusSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateAdminPresentationDeckStatusFailure.type, true);
    }
}

function* getPresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getPresentationDeckRequest,
            actions.payload
        );
        yield put(getPresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getPresentationDeckFailure.type, false);
    }
}

export function* rootSaga() {
    yield takeLatest(getPresentationDecks.type, getPresentationDecksSaga);
    yield takeLatest(createPresentationDeck.type, createPresentationDeckSaga);
    yield takeLatest(createPresentationDeckSlides.type, createPresentationDeckSlidesSaga);
    yield takeLatest(deletePresentationDeck.type, deletePresentationDeckSaga);
    yield takeLatest(updatePresentationDeck.type, updatePresentationDeckSaga);
    yield takeLatest(updatePresentationDeckStatus.type, updatePresentationDeckStatusSaga);
    yield takeLatest(updateAdminPresentationDeckStatus.type, updateAdminPresentationDeckStatusSaga);
    yield takeLatest(getPresentationDeck.type, getPresentationDeckSaga);
    yield takeLatest(clonePresentationDeck.type, clonePresentationDeckSaga);
}
