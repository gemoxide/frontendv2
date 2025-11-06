import { useSelector } from "react-redux";
import { IPresentationDeck } from "../../../../../core/interfaces/presentation-decks.interface";
import { mapDispatchToProps } from "../../../../../core/state/reducer/presentation-decks";
import { RootState } from "../../../../../core/state/reducer";
import { FormikProvider, Form, useFormik } from "formik";
import { CreatePresentationDeckScheme } from "../../../../../core/services/presentation-decks/presentation-decks.schema";
import Input from "../../../../../core/components/Forms/Input";
import Textarea from "../../../../../core/components/Forms/TextArea";
import Button from "../../../../../core/components/Button";
import ToggleSwitch from "../../../../../core/components/Forms/ToggleSwitch";
import Select from "../../../../../core/components/Forms/Select";
import { PRESENTATION_DECK_TYPES_OPTIONS } from "../../../../../core/constants/presentation-deck-types";

interface Props {
    selectedPresentationDeck: IPresentationDeck;
}

const CreatePresentationDeckForm: React.FC<Props> = ({
    selectedPresentationDeck,
}) => {
    const { createPresentationDeck, updatePresentationDeck } =
        mapDispatchToProps();

    const { loading: createPresentationDeckLoading } = useSelector(
        (state: RootState) => state.presentationDecks.createPresentationDeck
    );

    const { loading: updatePresentationDeckLoading } = useSelector(
        (state: RootState) => state.presentationDecks.updatePresentationDeck
    );

    const formik = useFormik({
        initialValues: {
            id: selectedPresentationDeck?.id || "",
            name: selectedPresentationDeck?.attributes?.name || "",
            description:
                selectedPresentationDeck?.attributes?.description || "",
            is_active: selectedPresentationDeck?.attributes?.is_active || false,
            deck_type: selectedPresentationDeck?.attributes?.deck_type || "",
        },
        validationSchema: CreatePresentationDeckScheme,
        onSubmit: async (values) => {
            if (selectedPresentationDeck?.id) updatePresentationDeck(values);
            else createPresentationDeck(values);
        },
    });

    const loading =
        createPresentationDeckLoading || updatePresentationDeckLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedPresentationDeck?.id
                            ? "Update Presentation Deck"
                            : "Add Presentation Deck"}
                    </h1>
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeHolder="Name"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <Select
                        name="deck_type"
                        placeHolder="Select Deck Type"
                        autoComplete
                        options={PRESENTATION_DECK_TYPES_OPTIONS}
                        variant="default"
                    />

                    <Textarea
                        label="Description"
                        name="description"
                        placeHolder="Description"
                        autoComplete
                        disabled={loading}
                        variant="default"
                    />
                    <ToggleSwitch
                        label="Active"
                        isToggled={formik.values.is_active}
                        onChange={(bool) =>
                            formik.setFieldValue("is_active", bool)
                        }
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save"
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

export default CreatePresentationDeckForm;
