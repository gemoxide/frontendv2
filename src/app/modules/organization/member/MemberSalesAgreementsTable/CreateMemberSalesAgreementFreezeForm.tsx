import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/member-sales-agreement-freezes";
import { RootState } from "../../../../core/state/reducer";
import { Form, FormikProvider, useFormik } from "formik";
import { IMemberSalesAgreement } from "../../../../core/interfaces/member-sales-agreement.interface";
import { createMemberSalesAgreementFreezeSchema } from "../../../../core/services/member-sales-agreement-freezes/member-sales-agreement-freezes.schema";
import Input from "../../../../core/components/Forms/Input";
import Textarea from "../../../../core/components/Forms/TextArea";
import Button from "../../../../core/components/Button";
import { confirmDelete } from "../../../../core/helpers/prompt";

interface Props {
    selectedSalesAgreement?: IMemberSalesAgreement;
    memberId: number;
}

const CreateMemberSalesAgreementFreezeForm: React.FC<Props> = ({
    memberId,
    selectedSalesAgreement,
}) => {
    const {
        createMemberSalesAgreementFreeze,
        deleteMemberSalesAgreementFreeze,
    } = mapDispatchToProps();

    const { loading: createFreezeLoading } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreementFreezes.createMemberSalesAgreementFreeze
    );

    const formik = useFormik({
        initialValues: {
            member_id: memberId,
            member_sales_agreement_id: selectedSalesAgreement?.id || 0,
            start_date:
                selectedSalesAgreement?.relationships.current_freeze?.attributes
                    .start_date ||
                selectedSalesAgreement?.attributes.start_date ||
                "",
            end_date:
                selectedSalesAgreement?.relationships.current_freeze?.attributes
                    .end_date ||
                selectedSalesAgreement?.attributes.end_date ||
                "",
            notes:
                selectedSalesAgreement?.relationships.current_freeze?.attributes
                    .notes || "",
        },
        validationSchema: createMemberSalesAgreementFreezeSchema(
            new Date(selectedSalesAgreement?.attributes.start_date || ""),
            new Date(selectedSalesAgreement?.attributes.end_date || "")
        ),
        onSubmit: async (values, { resetForm }) => {
            createMemberSalesAgreementFreeze(values);
            resetForm();
        },
    });

    const deleteFreeze = async () => {
        const { isConfirmed } = await confirmDelete("Freeze");
        if (isConfirmed) {
            deleteMemberSalesAgreementFreeze({
                id:
                    selectedSalesAgreement?.relationships?.current_freeze.id ||
                    0,
                member_id: memberId,
                member_sales_agreement_id: selectedSalesAgreement?.id || 0,
            });
        }
    };

    const loading = createFreezeLoading;

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        Freeze Sales Agreement
                    </h1>
                    <Input
                        label="Start Date"
                        name="start_date"
                        type="date"
                        placeHolder="Start Date"
                        disabled={
                            loading ||
                            !!selectedSalesAgreement?.relationships
                                .current_freeze
                        }
                        variant="default"
                    />
                    <Input
                        label="End Date"
                        name="end_date"
                        type="date"
                        placeHolder="End Date"
                        disabled={
                            loading ||
                            !!selectedSalesAgreement?.relationships
                                .current_freeze
                        }
                        variant="default"
                    />
                    <Textarea
                        label="Notes"
                        name="notes"
                        placeHolder="Notes"
                        autoComplete
                        variant="default"
                        disabled={
                            loading ||
                            !!selectedSalesAgreement?.relationships
                                .current_freeze
                        }
                    />
                    <div className="py-4">
                        {!!selectedSalesAgreement?.relationships
                            .current_freeze ? (
                            <Button
                                variant="danger"
                                label="Delete Freeze"
                                isSubmitting={loading}
                                className={"w-full btn-md"}
                                onClick={deleteFreeze}
                            />
                        ) : (
                            <Button
                                variant="primary"
                                label="Save"
                                isSubmitting={loading}
                                className={"w-full btn-md"}
                                onClick={formik.submitForm}
                            />
                        )}
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CreateMemberSalesAgreementFreezeForm;
