import { useEffect, useState } from "react";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import Note from "../components/Note";
import Modal from "../../../../../core/components/Modal";
import CreateNoteForm from "./CreateNotesForm";
import { mapDispatchToProps } from "../../../../../core/state/reducer/user-notes";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { IUserNote } from "../../../../../core/interfaces/user-notes.interface";

const Notes = () => {
    const { id } = useParams();
    const [isOpenCreateNoteModal, setIsOpenCreateNoteModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [page, setPage] = useState(1);

    const { getUserNotes, deleteUserNote } = mapDispatchToProps();
    const { loading: createUserNoteLoading, success: createUserNoteSuccess } =
        useSelector((state: RootState) => state.userNotes.createUserNote);
    const { loading: updateUserNoteLoading, success: updateUserNoteSuccess } =
        useSelector((state: RootState) => state.userNotes.updateUserNote);

    const { loading: getUserNotesLoading, data: getUserNotesData } =
        useSelector((state: RootState) => state.userNotes.getUserNotes);

    const { data } = useSelector((state: RootState) => state.auth.user);

    const fetch = async () => {
        if (id)
            getUserNotes({
                user_id: id,
                query: {
                    page,
                },
            });
    };

    useEffect(() => {
        if (!createUserNoteLoading && createUserNoteSuccess) {
            setIsOpenCreateNoteModal(false);
        }
    }, [createUserNoteLoading]);

    useEffect(() => {
        if (!updateUserNoteLoading && updateUserNoteSuccess) {
            setIsOpenCreateNoteModal(false);
        }
    }, [updateUserNoteLoading]);

    useEffect(() => {
        fetch();
    }, []);

    const handleEdit = (userNote: IUserNote) => {
        setSelectedNote(userNote);
        setIsOpenCreateNoteModal(true);
    };

    const handleDelete = (userNote: IUserNote) => {
        if (id) deleteUserNote({ id: userNote.id, user_id: id });
    };

    return (
        <div className="bg-white shadow-md rounded-md p-6 mt-4 h-1/6">
            <Modal
                isOpen={isOpenCreateNoteModal}
                onClose={() => setIsOpenCreateNoteModal(false)}
            >
                <CreateNoteForm
                    userId={id || ""}
                    selectedNote={selectedNote}
                    creatorId={data?.id}
                />
            </Modal>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">Notes </h1>
                <KebabDropdown
                    orientation="horizontal"
                    lists={[
                        {
                            label: "Create note",
                            action: () => {
                                setSelectedNote(undefined);
                                setIsOpenCreateNoteModal(true);
                            },
                        },
                    ]}
                />
            </div>
            <hr />
            {getUserNotesLoading && <Skeleton className="my-2" count={2} />}
            {!getUserNotesLoading &&
            getUserNotesData?.data &&
            getUserNotesData?.data?.length > 0 ? (
                <div className=" overflow-auto h-4/5">
                    {getUserNotesData?.data?.map((userNote, idx) => {
                        const isShowOptions =
                            userNote?.relationships?.user?.id == id;
                        return (
                            <Note
                                key={idx}
                                handleEdit={() => handleEdit(userNote)}
                                handleDelete={() => handleDelete(userNote)}
                                isShowOptions={isShowOptions}
                                note={userNote?.attributes?.note}
                                createdAt={userNote?.attributes?.created_at}
                                name={`${userNote?.relationships?.user?.attributes?.first_name} ${userNote?.relationships?.user?.attributes?.last_name}`}
                            />
                        );
                    })}
                </div>
            ) : (
                <>
                    {getUserNotesData?.data?.length === 0 && (
                        <div className="bg-tertiary p-4 mt-2 text-center">
                            No notes yet
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Notes;
