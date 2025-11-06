import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/user-notes";
import { CreateUserNoteScheme } from "../../../../../core/services/user-notes/user-notes.scheme";
import { INote } from "../../../../../core/interfaces/notes.interface";
import { useParams } from "react-router-dom";
import Textarea from "../../../../../core/components/Forms/TextArea";

type Props = {
    selectedNote?: INote;
    creatorId?: number;
    userId: string;
};

const CreateNoteForm: React.FC<Props> = ({
    selectedNote,
    userId,
    creatorId,
}) => {
    const { createUserNote, updateUserNote } = mapDispatchToProps();

    const { loading: createUserNoteLoading } = useSelector(
        (state: RootState) => state.userNotes.createUserNote
    );

    const { loading: updateUserNoteLoading } = useSelector(
        (state: RootState) => state.userNotes.updateUserNote
    );

    const formik = useFormik({
        initialValues: {
            id: selectedNote?.id,
            note: selectedNote?.attributes?.note,
            creator_id: creatorId,
            user_id: userId,
        },
        validationSchema: CreateUserNoteScheme,
        onSubmit: async (values) => {
            if (userId) {
                if (values?.id) updateUserNote({ ...values });
                else createUserNote({ ...values });
            }
        },
    });

    const loading = createUserNoteLoading || updateUserNoteLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedNote?.id ? "Edit Note" : "Add Note"}
                    </h1>
                    <Textarea
                        label="Create note"
                        name="note"
                        placeHolder="Enter description about the form"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save Note"
                            isSubmitting={loading}
                            className={"w-full btn-md"}
                            onClick={formik?.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateNoteForm;
