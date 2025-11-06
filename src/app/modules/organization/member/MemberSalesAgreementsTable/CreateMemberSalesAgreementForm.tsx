import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { IMemberSalesAgreement } from "../../../../core/interfaces/member-sales-agreement.interface";
import { mapDispatchToProps } from "../../../../core/state/reducer/member-sales-agreements";
import { RootState } from "../../../../core/state/reducer";
import { Form, FormikProvider, useFormik } from "formik";
import { CreateMemberSalesAgreementScheme } from "../../../../core/services/member-sales-agreements/member-sales-agreements.schema";
import Button from "../../../../core/components/Button";
import Select from "../../../../core/components/Forms/Select";
import Input from "../../../../core/components/Forms/Input";
import { memberSalesAgreementStatusDropdown } from "../../../../core/constants/member-sales-agreement-status";
import { ISalesAgreement } from "../../../../core/interfaces/sales-agreements.interface";
import { add as addDate } from "date-fns";

interface Props {
    selectedSalesAgreement?: IMemberSalesAgreement;
    salesAgreements: ISalesAgreement[];
    memberId: number;
    refreshData: () => void;
}

const CreateMemberSalesAgreementForm: React.FC<Props> = ({
    memberId,
    selectedSalesAgreement,
    salesAgreements,
    refreshData,
}) => {
    const { createMemberSalesAgreement, updateMemberSalesAgreement } =
        mapDispatchToProps();

    const { loading: createMemberSalesAgreementLoading } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreements.createMemberSalesAgreement
    );

    const { loading: updateMemberSalesAgreementLoading } = useSelector(
        (state: RootState) =>
            state.memberSalesAgreements.updateMemberSalesAgreement
    );

    const formik = useFormik({
        initialValues: {
            id: selectedSalesAgreement?.id || undefined,
            member_id: memberId,
            sales_agreement_id:
                selectedSalesAgreement?.relationships?.sales_agreement?.id ||
                undefined,
            start_date: selectedSalesAgreement?.attributes.start_date || "",
            end_date: selectedSalesAgreement?.attributes.end_date || "",
        },
        validationSchema: CreateMemberSalesAgreementScheme,
        onSubmit: async (values, { resetForm }) => {
            if (selectedSalesAgreement?.id) updateMemberSalesAgreement(values);
            else createMemberSalesAgreement(values);
            resetForm();
            refreshData();
        },
    });

    useEffect(() => {
        if (formik.values.sales_agreement_id && formik.values.start_date) {
            const selected = salesAgreements.find(
                (agreement) =>
                    agreement.id.toString() ===
                    formik.values.sales_agreement_id?.toString()
            );

            formik.setValues({
                ...formik.values,
                end_date: addDate(new Date(formik.values.start_date), {
                    [selected?.attributes.duration_frequency as keyof Duration]:
                        selected?.attributes.duration,
                })
                    .toISOString()
                    .split("T")[0],
            });
        }
    }, [formik.values.start_date, formik.values.sales_agreement_id]);

    const loading =
        createMemberSalesAgreementLoading || updateMemberSalesAgreementLoading;

    const salesAgreementOptions = useMemo(() => {
        return salesAgreements.map((agreement) => ({
            label: agreement.attributes.name,
            value: agreement.id,
        }));
    }, [salesAgreements]);

    return (
        <div className="w-full md:w-96 h-full flex items-center justify-center">
            <FormikProvider value={formik}>
                <Form className="space-y-4 w-full">
                    <h1 className="font-bold text-xl">
                        {selectedSalesAgreement?.id
                            ? "Update Member Sales Agreement"
                            : "Add Member Sales Agreement"}
                    </h1>
                    <Select
                        label="Sales Agreement"
                        name="sales_agreement_id"
                        placeHolder="Select Sales Agreement"
                        autoComplete
                        variant="default"
                        options={salesAgreementOptions}
                    />
                    <Input
                        label="Start Date"
                        name="start_date"
                        type="date"
                        placeHolder="Start Date"
                        disabled={loading}
                        variant="default"
                    />
                    <Input
                        label="End Date"
                        name="end_date"
                        type="date"
                        placeHolder="End Date"
                        readonly={true}
                        variant="default"
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

export default CreateMemberSalesAgreementForm;
