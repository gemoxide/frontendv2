import { takeLatest, call, put } from "redux-saga/effects";
import {
    completeMemberPresentationDeck,
    completeMemberPresentationDeckFailure,
    completeMemberPresentationDeckSuccess,
    createGrowPresentationAnswer,
    createGrowPresentationAnswerFailure,
    createGrowPresentationAnswerSuccess,
    createMemberPresentationDeck,
    createMemberPresentationDeckFailure,
    createMemberPresentationDeckSuccess,
    deleteMemberPresentationDeck,
    deleteMemberPresentationDeckFailure,
    deleteMemberPresentationDeckSuccess,
    getMemberPresentationDeck,
    getMemberPresentationDeckFailure,
    getMemberPresentationDeckSuccess,
    getMemberPresentationDecks,
    getMemberPresentationDecksFailure,
    getMemberPresentationDecksSuccess,
    updateMemberPresentationDeck,
    updateMemberPresentationDeckCurrentSlide,
    updateMemberPresentationDeckCurrentSlideFailure,
    updateMemberPresentationDeckCurrentSlideSuccess,
    updateMemberPresentationDeckFailure,
    updateMemberPresentationDeckSuccess,
    updateMemberPresentationDeckUser,
    updateMemberPresentationDeckUserFailure,
    updateMemberPresentationDeckUserSuccess,
} from "../reducer/member-presentation-decks";
import {
    completeMemberPresentationDeckRequest,
    createMemberPresentationDecksRequest,
    deleteMemberPresentationDecksRequest,
    getMemberPresentationDeckRequest,
    getMemberPresentationDecksRequest,
    updateMemberPresentationDeckCurrentSlideRequest,
    updateMemberPresentationDeckUserRequest,
    updateMemberPresentationDecksRequest,
} from "../../services/member-presentation-decks/member-presentation-decks.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetMemberPresentationDecksQuery } from "../../interfaces/member-presentation-decks.interface";
import { GetMemberPresentationDeckRequestActionPayload } from "../types/member-presentation-decks";
import { createGrowPresentationAnswersRequest } from "../../services/answers/answers.service";

function* getMemberPresentationDecksSaga(
    actions: PayloadAction<GetMemberPresentationDecksQuery>
) {
    try {
        const data: AxiosResponse = yield call(
            getMemberPresentationDecksRequest,
            actions.payload.member_id,
            actions.payload.query
        );
        yield put(getMemberPresentationDecksSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberPresentationDecksFailure.type,
            true
        );
    }
}

function* getMemberPresentationDeckSaga(
    actions: GetMemberPresentationDeckRequestActionPayload
) {
    try {
        const { data }: AxiosResponse = yield call(
            getMemberPresentationDeckRequest,
            actions.payload
        );
        yield put(getMemberPresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberPresentationDeckFailure.type,
            true
        );
    }
}

function* createMemberPresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createMemberPresentationDecksRequest,
            actions.payload
        );
        yield put(createMemberPresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createMemberPresentationDeckFailure.type,
            true
        );
    }
}

function* createGrowPresentationAnswersSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createGrowPresentationAnswersRequest,
            actions.payload
        );
        yield put(createGrowPresentationAnswerSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createGrowPresentationAnswerFailure.type,
            true
        );
    }
}

function* updateMemberPresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberPresentationDecksRequest,
            actions.payload
        );
        yield put(updateMemberPresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateMemberPresentationDeckFailure.type,
            true
        );
    }
}

function* updateMemberPresentationDeckCurrentSlideSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberPresentationDeckCurrentSlideRequest,
            actions.payload
        );
        yield put(updateMemberPresentationDeckCurrentSlideSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateMemberPresentationDeckCurrentSlideFailure.type,
            true
        );
    }
}

function* completeMemberPresentationDeckSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            completeMemberPresentationDeckRequest,
            actions.payload
        );
        yield put(completeMemberPresentationDeckSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            completeMemberPresentationDeckFailure.type,
            true
        );
    }
}

function* updateMemberPresentationDeckUserSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberPresentationDeckUserRequest,
            actions.payload
        );
        yield put(updateMemberPresentationDeckUserSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateMemberPresentationDeckUserFailure.type,
            true
        );
    }
}

function* deleteMemberPresentationDeckSaga(
    actions: PayloadAction<{ member_id: string; id: string }>
) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteMemberPresentationDecksRequest,
            actions.payload.member_id,
            actions.payload.id
        );
        yield put(
            deleteMemberPresentationDeckSuccess({
                ...data,
                id: actions.payload.id,
            })
        );
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            deleteMemberPresentationDeckFailure.type,
            true
        );
    }
}

export function* rootSaga() {
    yield takeLatest(
        getMemberPresentationDecks.type,
        getMemberPresentationDecksSaga
    );
    yield takeLatest(
        getMemberPresentationDeck.type,
        getMemberPresentationDeckSaga
    );
    yield takeLatest(
        createMemberPresentationDeck.type,
        createMemberPresentationDeckSaga
    );
    yield takeLatest(
        updateMemberPresentationDeck.type,
        updateMemberPresentationDeckSaga
    );
    yield takeLatest(
        deleteMemberPresentationDeck.type,
        deleteMemberPresentationDeckSaga
    );
    yield takeLatest(
        updateMemberPresentationDeckCurrentSlide.type,
        updateMemberPresentationDeckCurrentSlideSaga
    );
    yield takeLatest(
        completeMemberPresentationDeck.type,
        completeMemberPresentationDeckSaga
    );
    yield takeLatest(
        updateMemberPresentationDeckUser.type,
        updateMemberPresentationDeckUserSaga
    );
    yield takeLatest(
        createGrowPresentationAnswer.type,
        createGrowPresentationAnswersSaga
    );
}
