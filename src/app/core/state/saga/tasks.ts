import { takeLatest, call, put } from "redux-saga/effects";
import {
    getTasks,
    getTasksFailure,
    getTasksSuccess,
    createTask,
    createTaskFailure,
    createTaskSuccess,
    deleteTask,
    deleteTaskFailure,
    deleteTaskSuccess,
    updateTask,
    updateTaskFailure,
    updateTaskSuccess,
    getTask,
    getTaskFailure,
    getTaskSuccess,
    updateCompleteTask,
    updateCompleteTaskFailure,
    updateCompleteTaskSuccess,
    getMemberTasks,
    getMemberTasksFailure,
    getMemberTasksSuccess,
} from "../reducer/tasks";
import {
    createTaskRequest,
    deleteTaskRequest,
    updateTaskRequest,
    getTasksRequest,
    getTaskRequest,
    updateCompleteTaskRequest,
    getMemberTasksRequest,
} from "../../services/tasks/tasks.service";
import { AxiosResponse } from "axios";
import { handleServerException } from "../../services/utils/utils.service";
import { GetMemberTasksRequestActionPayload } from "../types/tasks";

function* getTasksSaga(actions: any) {
    try {
        const data: AxiosResponse = yield call(
            getTasksRequest,
            actions.payload
        );
        yield put(getTasksSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getTasksFailure.type, true);
    }
}

function* createTaskSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            createTaskRequest,
            actions.payload
        );
        yield put(createTaskSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, createTaskFailure.type, true);
    }
}

function* deleteTaskSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            deleteTaskRequest,
            actions.payload
        );
        yield put(deleteTaskSuccess({ ...data, id: actions.payload }));
    } catch (err: any) {
        yield call(handleServerException, err, deleteTaskFailure.type, true);
    }
}

function* updateTaskSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateTaskRequest,
            actions.payload
        );
        yield put(updateTaskSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, updateTaskFailure.type, true);
    }
}

function* getTaskSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            getTaskRequest,
            actions.payload
        );
        yield put(getTaskSuccess(data));
    } catch (err: any) {
        yield call(handleServerException, err, getTaskFailure.type, true);
    }
}

function* updateCompleteTaskSaga(actions: any) {
    try {
        const { data }: AxiosResponse = yield call(
            updateCompleteTaskRequest,
            actions.payload
        );

        yield put(
            updateCompleteTaskSuccess({ ...data, id: actions.payload.id })
        );
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            updateCompleteTaskFailure.type,
            true
        );
    }
}

function* getMemberTasksSaga(actions: GetMemberTasksRequestActionPayload) {
    try {
        const data: AxiosResponse = yield call(
            getMemberTasksRequest,
            actions.payload.id,
            actions.payload.query
        );
        yield put(getMemberTasksSuccess(data));
    } catch (err: any) {
        yield call(
            handleServerException,
            err,
            getMemberTasksFailure.type,
            true
        );
    }
}
export function* rootSaga() {
    yield takeLatest(getTasks.type, getTasksSaga);
    yield takeLatest(createTask.type, createTaskSaga);
    yield takeLatest(deleteTask.type, deleteTaskSaga);
    yield takeLatest(updateTask.type, updateTaskSaga);
    yield takeLatest(getTask.type, getTaskSaga);
    yield takeLatest(updateCompleteTask.type, updateCompleteTaskSaga);
    yield takeLatest(getMemberTasks.type, getMemberTasksSaga);
}
