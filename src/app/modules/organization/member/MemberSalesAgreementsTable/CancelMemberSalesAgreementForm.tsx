import { Form, FormikProvider, useFormik } from "formik";
import { IMemberSalesAgreement } from "../../../../core/interfaces/member-sales-agreement.interface";
import Input from "../../../../core/components/Forms/Input";
import Textarea from "../../../../core/components/Forms/TextArea";
import Button from "../../../../core/components/Button";
import { CancelMemberSalesAgreementScheme } from "../../../../core/services/member-sales-agreements/member-sales-agreements.schema";
import { cancelMemberSalesAgreementRequest } from "../../../../core/services/member-sales-agreements/member-sales-agreements.services";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props {
    selectedSalesAgreement?: IMemberSalesAgreement;
    memberId: number;
    refreshData: () => void;
}

const CancelMemberSalesAgreementForm: React.FC<Props> = ({
    memberId,
    selectedSalesAgreement,
    refreshData,
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            canceled_at: selectedSalesAgreement?.attributes.canceled_at || "",
            canceled_reason:
                selectedSalesAgreement?.attributes.canceled_reason || "",
        },
        validationSchema: CancelMemberSalesAgreementScheme,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const { data } = await cancelMemberSalesAgreementRequest(
                    {
                        member_id: memberId,
                        id: selectedSalesAgreement?.id || 0,
                    },
                    {
                        canceled_at: values.canceled_at,
                        canceled_reason: values.canceled_reason,
                    }
                );
                if (data) {
                    toast.success("Sales agreement cancelled successfully");
                    refreshData();
                    resetForm();
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error("Failed to cancel sales agreement");
            }
        },
    });

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        Cancel Sales Agreement
                    </h1>
                    <Input
                        label="Canceled At"
                        name="canceled_at"
                        type="date"
                        placeHolder="Canceled At"
                        disabled={
                            loading ||
                            !!selectedSalesAgreement?.relationships
                                .current_freeze
                        }
                        variant="default"
                    />
                    <Textarea
                        label="Canceled Reason"
                        name="canceled_reason"
                        placeHolder="Canceled Reason"
                        autoComplete
                        variant="default"
                        disabled={loading}
                    />
                    <div className="py-4">
                        <Button
                            variant="primary"
                            label="Save"
                            isSubmitting={loading}
                            className={"w-full btn-md"}
                            onClick={formik.submitForm}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default CancelMemberSalesAgreementForm;
