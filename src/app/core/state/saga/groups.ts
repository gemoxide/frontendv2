import { takeLatest, call, put } from "redux-saga/effects";
import {
    getGroups,
    getGroupsFailure,
    getGroupsSuccess,
    createGroup,
    createGroupFailure,
    createGroupSuccess,
    deleteGroup,
    deleteGroupFailure,
    deleteGroupSuccess,
    updateGroup,
    updateGroupFailure,
    updateGroupSuccess,
} from "../reducer/groups";
import {
    createGroupRequest,
    deleteGroupRequest,
    updateGroupRequest,
    getGroupsRequest,
} from "../../services/groups/groups.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";

function* getGroupsSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getGroupsRequest,
            actions.payload
        );
        yield put(getGroupsSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getGroupsFailure.type, true);
    }
}

function* createGroupSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createGroupRequest,
            actions.payload
        );
        yield put(createGroupSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createGroupFailure.type, true);
    }
}

function* deleteGroupSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteGroupRequest,
            actions.payload
        );
        yield put(deleteGroupSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, deleteGroupFailure.type, true);
    }
}

function* updateGroupSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateGroupRequest,
            actions.payload
        );
        yield put(updateGroupSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateGroupFailure.type, true);
    }
}

export function* rootSaga() {
    yield takeLatest(getGroups.type, getGroupsSaga);
    yield takeLatest(createGroup.type, createGroupSaga);
    yield takeLatest(deleteGroup.type, deleteGroupSaga);
    yield takeLatest(updateGroup.type, updateGroupSaga);
}
