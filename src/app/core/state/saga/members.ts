import { takeLatest, call, put } from "redux-saga/effects";
import {
    createMember,
    createMemberFailure,
    createMemberSuccess,
    deleteMember,
    deleteMemberFailure,
    deleteMemberSuccess,
    getMembers,
    getMembersFailure,
    getMembersSuccess,
    updateMember,
    updateMemberFailure,
    updateMemberSuccess,
    getMember,
    getMemberFailure,
    getMemberSuccess,
    createMemberFile,
    createMemberFileFailure,
    createMemberFileSuccess,
    getMemberFile,
    getMemberFileFailure,
    getMemberFileSuccess,
    createMemberLead,
    createMemberLeadFailure,
    createMemberLeadSuccess,
    getGymMembersSuccess,
    getGymMembersFailure,
    getGymMembers,
    updateMemberLeadSuccess,
    updateMemberLeadFailure,
    updateMemberLead,
    updateMemberAvatarSuccess,
    updateMemberAvatarFailure,
    updateMemberAvatar,
} from "../reducer/members";
import {
    createMemberRequest,
    deleteMemberRequest,
    getMembersRequest,
    updateMemberRequest,
    getMemberRequest,
    createMemberFileRequest,
    getMemberFileRequest,
    createMemberLeadRequest,
    getGymMembersRequest,
    updateMemberLeadRequest,
    updateMemberAvatarRequest,
} from "../../services/members/members.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { CreateMemberMediaRequestActionPayload } from "../types/members";

function* getMembersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getMembersRequest,
            actions.payload
        );
        yield put(getMembersSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getMembersFailure.type, true);
    }
}

function* getGymMembersSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGymMembersRequest,
            actions.payload
        );
        yield put(getGymMembersSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getGymMembersFailure.type, true);
    }
}

function* createMemberSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createMemberRequest,
            actions.payload
        );
        yield put(createMemberSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createMemberFailure.type, true);
    }
}

function* deleteMemberSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteMemberRequest,
            actions.payload
        );

        yield put(deleteMemberSuccess({ ...data, id: actions.payload }));
    } catch (err: any) {
        yield call(handleServerException, err, deleteMemberFailure.type, true);
    }
}

function* updateMemberSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberRequest,
            actions.payload
        );
        yield put(updateMemberSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateMemberFailure.type, true);
    }
}

function* getMemberSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getMemberRequest,
            actions.payload
        );
        yield put(getMemberSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getMemberFailure.type, false);
    }
}

function* createMemberFileSaga(actions: CreateMemberMediaRequestActionPayload) {
    try {
        const { data }: AxiosResponse = yield call(
            createMemberFileRequest,
            actions.payload.id,
            actions.payload.body
        );
        yield put(createMemberFileSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createMemberFileFailure.type,
            true
        );
    }
}

function* getMemberFileSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getMemberFileRequest,
            actions.payload
        );
        yield put(getMemberFileSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getMemberFileFailure.type, true);
    }
}

function* createMemberLeadSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createMemberLeadRequest,
            actions.payload
        );
        yield put(createMemberLeadSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            createMemberLeadFailure.type,
            true
        );
    }
}

function* updateMemberLeadSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberLeadRequest,
            actions.payload
        );
        yield put(updateMemberLeadSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateMemberLeadFailure.type, true);
    }
}

function* updateMemberAvatarSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateMemberAvatarRequest,
            actions.payload
        );
        yield put(updateMemberAvatarSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateMemberAvatarFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getMembers.type, getMembersSaga);
    yield takeLatest(createMember.type, createMemberSaga);
    yield takeLatest(deleteMember.type, deleteMemberSaga);
    yield takeLatest(updateMember.type, updateMemberSaga);
    yield takeLatest(getMember.type, getMemberSaga);
    yield takeLatest(createMemberFile.type, createMemberFileSaga);
    yield takeLatest(getMemberFile.type, getMemberFileSaga);
    yield takeLatest(createMemberLead.type, createMemberLeadSaga);
    yield takeLatest(updateMemberLead.type, updateMemberLeadSaga);
    yield takeLatest(getGymMembers.type, getGymMembersSaga);
    yield takeLatest(updateMemberAvatar.type, updateMemberAvatarSaga);
}
