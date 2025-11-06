import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/notes";
import { CreateNoteScheme } from "../../../../../core/services/notes/notes.scheme";
import { INote } from "../../../../../core/interfaces/notes.interface";
import { useParams } from "react-router-dom";
import Textarea from "../../../../../core/components/Forms/TextArea";

type Props = {
    selectedNote?: INote;
    groupAssessmentId?: number;
    memberId: string;
};

const CreateNoteForm: React.FC<Props> = ({ selectedNote, groupAssessmentId, memberId }) => {
    const { createNote, updateNote } = mapDispatchToProps();

    const { loading: createNoteLoading } = useSelector(
        (state: RootState) => state.notes.createNote
    );

    const { loading: updateNoteLoading } = useSelector(
        (state: RootState) => state.notes.updateNote
    );

    const formik = useFormik({
        initialValues: {
            id: selectedNote?.id,
            note: selectedNote?.attributes?.note,
            group_assessment_id: selectedNote?.relationships?.group_assessment?.id || groupAssessmentId
        },
        validationSchema: CreateNoteScheme,
        onSubmit: async (values) => {
            if (memberId) {
                if (values?.id) updateNote({ member_id: memberId, ...values });
                else createNote({ member_id: memberId, ...values });
            }
        },
    });

    const loading = createNoteLoading || updateNoteLoading;

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
