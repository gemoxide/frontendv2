import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import {
    CreateTaskRequestActionPayload,
    GetMemberTasksRequestActionPayload,
    GetTasksRequestActionPayload,
    Tasks,
    UpdateCompleteTaskRequestActionPayload,
} from "../types/tasks";

const initialState: Tasks = {
    getTasks: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    createTask: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateTask: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteTask: {
        success: false,
        loading: false,
        error: false,
    },
    getTask: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateCompleteTask: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getMemberTasks: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const TasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        getTasks(state, actions: GetTasksRequestActionPayload) {
            state.getTasks = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getTasksSuccess(state, actions) {
            state.getTasks = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getTasksFailure(state) {
            state.getTasks = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getMemberTasks(state, actions: GetMemberTasksRequestActionPayload) {
            state.getMemberTasks = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getMemberTasksSuccess(state, actions) {
            state.getMemberTasks = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getMemberTasksFailure(state) {
            state.getMemberTasks = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createTask(state, actions: CreateTaskRequestActionPayload) {
            state.createTask = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createTaskSuccess(state, actions) {
            state.createTask = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getTasks.data)
                state.getTasks.data.data.unshift(actions.payload);
        },
        createTaskFailure(state) {
            state.createTask = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        deleteTask(state, actions) {
            state.deleteTask = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteTaskSuccess(state, actions) {
            state.deleteTask = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getTasks.data?.data) {
                state.getTasks.data.data = state.getTasks.data?.data.filter(
                    (arrow) => arrow.id !== actions.payload.id
                );
            }
        },
        deleteTaskFailure(state) {
            state.deleteTask = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateTask(state, actions: CreateTaskRequestActionPayload) {
            state.updateTask = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateTaskSuccess(state, actions) {
            state.updateTask = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getTasks.data?.data && actions.payload) {
                const updatedNote = actions.payload;
                const findIndex = state.getTasks.data?.data?.findIndex(
                    (form) => form.id == updatedNote.id
                );

                if (state?.getTasks?.data?.data?.[findIndex])
                    state.getTasks.data.data[findIndex] = updatedNote;
            }
        },
        updateTaskFailure(state) {
            state.updateTask = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        getTask(state, actions: PayloadAction<number>) {
            state.getTask = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getTaskSuccess(state, actions) {
            state.getTask = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getTaskFailure(state) {
            state.getTask = {
                loading: false,
                success: false,
                error: true,
            };
        },

        updateCompleteTask(
            state,
            actions: UpdateCompleteTaskRequestActionPayload
        ) {
            state.updateCompleteTask = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateCompleteTaskSuccess(state, actions) {
            state.updateCompleteTask = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getTasks.data?.data && actions.payload) {
                const updatedTask = actions.payload;
                const findIndex = state.getTasks.data?.data?.findIndex(
                    (task) => task.id == updatedTask.id
                );
                state.getTasks.data.data[findIndex].attributes.completed_at =
                    new Date().toDateString();
            }

            if (state.getMemberTasks.data?.data && actions.payload) {
                const updatedTask = actions.payload;

                const findIndexMember = state.getMemberTasks.data?.data?.findIndex(
                    (task) => task.id == updatedTask.id
                );
                state.getMemberTasks.data.data[findIndexMember].attributes.completed_at =
                    new Date().toDateString();
            }
        },
        updateCompleteTaskFailure(state) {
            state.updateCompleteTask = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

    },
});

export const {
    getTasks,
    getTasksFailure,
    getTasksSuccess,
    createTask,
    createTaskFailure,
    createTaskSuccess,
    deleteTask,
    deleteTaskFailure,
    deleteTaskSuccess,
    updateTaskFailure,
    updateTaskSuccess,
    updateTask,
    getTask,
    getTaskFailure,
    getTaskSuccess,
    updateCompleteTask,
    updateCompleteTaskFailure,
    updateCompleteTaskSuccess,
    getMemberTasks,
    getMemberTasksFailure,
    getMemberTasksSuccess,
} = TasksSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getTasks,
            createTask,
            deleteTask,
            updateTask,
            getTask,
            updateCompleteTask,
            getMemberTasks,
        },
        useDispatch()
    );
};

export default TasksSlice.reducer;
