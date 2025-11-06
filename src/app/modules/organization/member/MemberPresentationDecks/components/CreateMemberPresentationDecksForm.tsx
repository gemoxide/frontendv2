import { Form, FormikProvider, useFormik } from "formik";
import Button from "../../../../../core/components/Button/index";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/member-presentation-decks";
import { CreateMemberPresentationDeckScheme } from "../../../../../core/services/member-presentation-decks/member-presentation-decks.scheme";
import { IMemberPresentationDeck } from "../../../../../core/interfaces/member-presentation-decks.interface";
import { useParams } from "react-router-dom";
import { mapDispatchToProps as mapDispatchToPropsPresentationDecks } from "../../../../../core/state/reducer/presentation-decks";
import { useEffect, useMemo } from "react";
import Select from "../../../../../core/components/Forms/Select";

type Props = {
    selectedMemberPresentationDeck?: IMemberPresentationDeck;
};

const CreateMemberPresentationDeckForm: React.FC<Props> = ({
    selectedMemberPresentationDeck,
}) => {
    const { id } = useParams();

    const { getPresentationDecks } = mapDispatchToPropsPresentationDecks();

    const { createMemberPresentationDeck, updateMemberPresentationDeck } =
        mapDispatchToProps();

    const { loading: createMemberPresentationDeckLoading } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.createMemberPresentationDeck
    );

    const { loading: updateMemberPresentationDeckLoading } = useSelector(
        (state: RootState) =>
            state.memberPresentationDecks.updateMemberPresentationDeck
    );

    const formik = useFormik({
        initialValues: {
            id: selectedMemberPresentationDeck?.id || "",
            presentation_deck_id:
                selectedMemberPresentationDeck?.relationships?.presentation_deck
                    ?.id || "",
        },
        validationSchema: CreateMemberPresentationDeckScheme,
        onSubmit: async (values) => {
            if (id) {
                if (values?.id)
                    updateMemberPresentationDeck({ member_id: id, ...values });
                else if (values.presentation_deck_id === "Grow") {
                    createMemberPresentationDeck({
                        member_id: id,
                        custom_deck: "Grow",
                    });
                } else {
                    createMemberPresentationDeck({ member_id: id, ...values });
                }
            }
        },
    });

    useEffect(() => {
        getPresentationDecks({ per_page: 100, is_active: true });
    }, []);

    const {
        loading: getPresentationDecksLoading,
        data: getPresentationDecksData,
    } = useSelector(
        (state: RootState) => state.presentationDecks.getPresentationDecks
    );

    const presentationDecksOption = useMemo(() => {
        return [
            ...(getPresentationDecksData?.data?.map((val) => {
                return { label: val?.attributes?.name, value: val?.id };
            }) || []),
            {
                label: "Path to Success",
                value: "Grow",
            },
        ];
    }, [getPresentationDecksData]);

    const loading =
        createMemberPresentationDeckLoading ||
        updateMemberPresentationDeckLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedMemberPresentationDeck?.id
                            ? "Edit Member Presentation Deck"
                            : "Add Member Presentation Deck"}
                    </h1>
                    <Select
                        label="Presentation deck"
                        name="presentation_deck_id"
                        placeHolder="Select a presentation deck"
                        autoComplete
                        disabled={getPresentationDecksLoading}
                        variant="default"
                        options={presentationDecksOption}
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Launch"
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

export default CreateMemberPresentationDeckForm;
