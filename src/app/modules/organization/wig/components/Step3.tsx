import React, { useState, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Range from "../../../../core/components/Range";
import Button from "../../../../core/components/Button";
import { getGymWigTotalDraftRequest } from "../../../../core/services/gym-revenue/gym-revenue.service";
import { formatCurrency } from "../../../../core/helpers/formatCurrency";
import { updateWigRequest } from "../../../../core/services/gyms/gyms.service";
import { RootState } from "../../../../core/state/reducer";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../../core/state/reducer/gyms";
type Props = {
    onClickGenerateWigDashboard: (payload: any) => void;
};
const Step3: React.FC<Props> = ({ onClickGenerateWigDashboard }) => {
    const { data: getGymData } = useSelector(
        (state: RootState) => state.gyms.getGym
    );
    const { getGym } = mapDispatchToProps();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalDraftRevenue, setTotalDraftRevenue] = useState<number>(0);
    const formik = useFormik({
        initialValues: {
            wig_monthly_membership_growth_percentage:
                Number(
                    getGymData?.attributes
                        .wig_monthly_membership_growth_percentage
                ) || 0.25,
            wig_monthly_pt_growth_percentage:
                Number(
                    getGymData?.attributes.wig_monthly_pt_growth_percentage
                ) || 0.25,
        },
        onSubmit: (values) => {
            onClickGenerateWigDashboard(values);
        },
    });

    const fetchWigTotalDraft = async () => {
        setIsLoading(true);
        try {
            const { data } = await getGymWigTotalDraftRequest(getGymData?.id);
            if (data) {
                setTotalDraftRevenue(data?.total_draft_revenue);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const updateSlider = async () => {
        try {
            const payload = {
                id: getGymData?.id,
                wig_monthly_membership_growth_percentage:
                    formik.values.wig_monthly_membership_growth_percentage,
                wig_monthly_pt_growth_percentage:
                    formik.values.wig_monthly_pt_growth_percentage,
            };
            const { data } = await updateWigRequest(payload);
            if (data) {
                fetchWigTotalDraft();
                getGym(getGymData?.id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getWigTotalDraft = setTimeout(() => {
            updateSlider();
        }, 500);
        return () => clearTimeout(getWigTotalDraft);
    }, [
        formik.values.wig_monthly_membership_growth_percentage,
        formik.values.wig_monthly_pt_growth_percentage,
    ]);

    return (
        <div className="max-w-4xl mx-auto py-4 px-14">
            <h1 className="text-2xl font-extrabold mb-8">
                <span className="text-gray-500">Step 3: </span>
                <span>Set your goals</span>
            </h1>

            <div className="mb-8">
                <span className="text-secondary font-bold text-sm">
                    Total {getGymData?.attributes?.wig_duration} Mo. Draft
                    Revenue WIG
                </span>
                {isLoading ? (
                    <div className="text-secondary font-extrabold text-3xl">
                        Loading...
                    </div>
                ) : (
                    <h3 className="text-secondary font-extrabold text-3xl">
                        {formatCurrency(totalDraftRevenue)}
                    </h3>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-20">
                {/* First Column */}
                <div className="flex-1">
                    <FormikProvider value={formik}>
                        <Form
                            onSubmit={formik.handleSubmit}
                            className="space-y-4 w-full mb-5"
                        >
                            <Range
                                label="Monthly Membership Growth %"
                                name="wig_monthly_membership_growth_percentage"
                                value={
                                    formik.values
                                        .wig_monthly_membership_growth_percentage
                                }
                                onChange={(value) =>
                                    formik.setFieldValue(
                                        "wig_monthly_membership_growth_percentage",
                                        value
                                    )
                                }
                                min={0.25}
                                max={25}
                                step={0.25}
                            />
                            <Range
                                label="Personal Training Growth %"
                                name="wig_monthly_pt_growth_percentage"
                                value={
                                    formik.values
                                        .wig_monthly_pt_growth_percentage
                                }
                                onChange={(value) =>
                                    formik.setFieldValue(
                                        "wig_monthly_pt_growth_percentage",
                                        value
                                    )
                                }
                                min={0.25}
                                max={25}
                                step={0.25}
                            />
                            <Button
                                label="Generate WIG Dashboard"
                                className="block w-full capitalize"
                                type="submit"
                            />
                        </Form>
                    </FormikProvider>
                </div>

                {/* Second Column */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">About WIG</h2>
                    <p className="text-gray-700">
                        A Wildly Important Goal (WIG) is a strategic priority
                        that will make the greatest impact on your
                        organization's success. It's a goal that, if not
                        achieved, makes other goals inconsequential.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Step3;
