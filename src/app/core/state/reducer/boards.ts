import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { Boards, GetBoardsRequestActionPayload, CreateBoardRequestActionPayload } from "../types/boards";

const initialState: Boards = {
    createBoard: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    deleteBoard: {
        success: false,
        loading: false,
        error: false,
    },
    getBoards: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    updateBoard: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
    getBoard: {
        data: undefined,
        success: false,
        loading: false,
        error: false,
    },
};

const BoardsSlice = createSlice({
    name: "Boards",
    initialState,
    reducers: {
        getBoards(state, actions: GetBoardsRequestActionPayload) {
            state.getBoards = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        getBoardsSuccess(state, actions) {
            state.getBoards = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getBoardsFailure(state) {
            state.getBoards = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },
        createBoard(state, actions: CreateBoardRequestActionPayload) {
            state.createBoard = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        createBoardSuccess(state, actions) {
            state.createBoard = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };

            if (state.getBoards.data)
                state.getBoards.data.data.unshift(actions.payload);
        },
        createBoardFailure(state) {
            state.createBoard = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        deleteBoard(
            state,
            actions: PayloadAction<number>
        ) {
            state.deleteBoard = {
                loading: true,
                success: false,
                error: false,
            };
        },
        deleteBoardSuccess(state, actions) {
            state.deleteBoard = {
                loading: false,
                success: true,
                error: false,
            };
            if (state.getBoards.data?.data) {
                state.getBoards.data.data = state.getBoards.data?.data.filter(
                    (board) => board.id !== actions.payload.id
                );
            }
        },
        deleteBoardFailure(state) {
            state.deleteBoard = {
                loading: false,
                success: false,
                error: true,
            };
        },
        updateBoard(state, actions: CreateBoardRequestActionPayload) {
            state.updateBoard = {
                data: undefined,
                loading: true,
                success: false,
                error: false,
            };
        },
        updateBoardSuccess(state, actions) {
            state.updateBoard = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
            if (state.getBoards.data?.data && actions.payload) {
                const updatedBoard = actions.payload;
                const findIndex = state.getBoards.data?.data?.findIndex(
                    (board) => board.id == updatedBoard.id
                );

                if (state?.getBoards?.data?.data?.[findIndex])
                    state.getBoards.data.data[findIndex] = updatedBoard;
            }
        },
        updateBoardFailure(state) {
            state.updateBoard = {
                data: undefined,
                loading: false,
                success: false,
                error: true,
            };
        },

        getBoard(state, actions: PayloadAction<number>) {
            state.getBoard = {
                loading: true,
                success: false,
                error: false,
            };
        },
        getBoardSuccess(state, actions) {
            state.getBoard = {
                data: actions.payload,
                loading: false,
                success: true,
                error: false,
            };
        },
        getBoardFailure(state) {
            state.getBoard = {
                loading: false,
                success: false,
                error: true,
            };
        },
    },
});

export const {
    createBoard,
    createBoardFailure,
    createBoardSuccess,
    deleteBoard,
    deleteBoardFailure,
    deleteBoardSuccess,
    getBoards,
    getBoardsFailure,
    getBoardsSuccess,
    updateBoard,
    updateBoardFailure,
    updateBoardSuccess,
    getBoard,
    getBoardFailure,
    getBoardSuccess
} = BoardsSlice.actions;

export const mapDispatchToProps = () => {
    return bindActionCreators(
        {
            getBoards,
            createBoard,
            updateBoard,
            deleteBoard,
            getBoard
        },
        useDispatch()
    );
};

export default BoardsSlice.reducer;
