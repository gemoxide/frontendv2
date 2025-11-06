import { useEffect, useState } from "react";
import KebabDropdown from "../../../../../core/components/KebabDropdown";
import Note from "../components/Note";
import Modal from "../../../../../core/components/Modal";
import CreateNoteForm from "./CreateNotesForm";
import { mapDispatchToProps } from "../../../../../core/state/reducer/notes";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../core/state/reducer";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { INote } from "../../../../../core/interfaces/notes.interface";

const Notes = () => {
    const { id } = useParams();
    const [isOpenCreateNoteModal, setIsOpenCreateNoteModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<any>();
    const [page, setPage] = useState(1);

    const { getNotes, deleteNote } = mapDispatchToProps();
    const { loading: createNoteLoading, success: createNoteSuccess } =
        useSelector((state: RootState) => state.notes.createNote);
    const { loading: updateNoteLoading, success: updateNoteSuccess } =
        useSelector((state: RootState) => state.notes.updateNote);

    const { loading: getNotesLoading, data: getNotesData } = useSelector(
        (state: RootState) => state.notes.getNotes
    );

    const { data } = useSelector((state: RootState) => state.auth.user);

    const fetch = async () => {
        if (id)
            getNotes({
                member_id: id,
                query: {
                    page,
                },
            });
    };

    useEffect(() => {
        if (!createNoteLoading && createNoteSuccess) {
            setIsOpenCreateNoteModal(false);
        }
    }, [createNoteLoading]);

    useEffect(() => {
        if (!updateNoteLoading && updateNoteSuccess) {
            setIsOpenCreateNoteModal(false);
        }
    }, [updateNoteLoading]);

    useEffect(() => {
        fetch();
    }, []);

    const handleEdit = (note: INote) => {
        setSelectedNote(note);
        setIsOpenCreateNoteModal(true);
    };

    const handleDelete = (note: INote) => {
        if (id) deleteNote({ id: note.id, member_id: id });
    };

    return (
        <div className="bg-white shadow-md rounded-md p-6 mt-4 h-1/6">
            <Modal
                isOpen={isOpenCreateNoteModal}
                onClose={() => setIsOpenCreateNoteModal(false)}
            >
                <CreateNoteForm memberId={id || ""} selectedNote={selectedNote}  />
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
            {getNotesLoading && <Skeleton className="my-2" count={2} />}
            {!getNotesLoading &&
            getNotesData?.data &&
            getNotesData?.data?.length > 0 ? (
                <div className=" overflow-auto h-4/5">
                    {getNotesData?.data?.map((note, idx) => {
                        const id = data?.id;
                        const isShowOptions =
                            note?.relationships?.user?.id == id;

                        return (
                            <Note
                                key={idx}
                                handleEdit={() => handleEdit(note)}
                                handleDelete={() => handleDelete(note)}
                                isShowOptions={isShowOptions}
                                note={note?.attributes?.note}
                                createdAt={note?.attributes?.created_at}
                                name={`${note?.relationships?.user?.attributes?.first_name} ${note?.relationships?.user?.attributes?.last_name}`}
                            />
                        );
                    })}
                </div>
            ) : (
                <>
                    {getNotesData?.data?.length === 0 && (
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
