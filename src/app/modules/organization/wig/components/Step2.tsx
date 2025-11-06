import React, { useState, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Input from "../../../../core/components/Forms/Input";
import Button from "../../../../core/components/Button";
import { preventNegative } from "../../../../core/helpers/preventNegative";
import { IGymRevenueMonth } from "../../../../core/interfaces/gym-revenue.interface";
import { numbersOnly } from "../../../../core/helpers/numbersOnly";
type Props = {
    currentMonth?: string;
    gymMonthRevenue?: IGymRevenueMonth;
    onClickNext: (payload: any) => void;
};
const Step2: React.FC<Props> = ({
    currentMonth,
    gymMonthRevenue,
    onClickNext,
}) => {
    const formik = useFormik({
        initialValues: {
            membership_revenue:
                gymMonthRevenue?.data?.attributes?.membership_revenue || "",
            membership_count:
                gymMonthRevenue?.data?.attributes?.membership_count || 0,
            pt_revenue: gymMonthRevenue?.data?.attributes?.pt_revenue || "",
            pt_count: gymMonthRevenue?.data?.attributes?.pt_count || 0,
        },
        onSubmit: (values) => {
            console.log(values);
        },
        enableReinitialize: true,
    });

    const previousMonthName = new Date(`${currentMonth || ""}-01T00:00:00Z`);

    previousMonthName.setUTCMonth(previousMonthName.getUTCMonth() - 1);

    const monthName = previousMonthName.toLocaleString("default", {
        month: "long",
        timeZone: "UTC",
    });

    const handleGenerateWigDashboard = () => {
        onClickNext(formik.values);
    };

    return (
        <div className="max-w-4xl mx-auto py-4 px-14">
            <h1 className="text-2xl font-extrabold mb-8">
                <span className="text-gray-500">Step 2: </span>
                <span>Enter info for {monthName}</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-20">
                {/* First Column */}
                <div className="flex-1">
                    <FormikProvider value={formik}>
                        <Form className="space-y-4 w-full mb-5">
                            <Input
                                label={`${monthName} - Membership Revenue`}
                                prefix="$"
                                inputClassName="pl-6"
                                value={formik.values.membership_revenue}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="membership_revenue"
                                type="text"
                                autoComplete
                                onKeyDown={preventNegative}
                                decimalPlaces={2}
                            />
                            <Input
                                label={`${monthName} - Membership Count`}
                                name="membership_count"
                                value={formik.values.membership_count}
                                type="text"
                                autoComplete
                                onKeyDown={preventNegative}
                                onInput={numbersOnly}
                                min="0"
                            />
                            <Input
                                label={`${monthName} - PT Revenue`}
                                prefix="$"
                                inputClassName="pl-6"
                                name="pt_revenue"
                                value={formik.values.pt_revenue}
                                type="text"
                                autoComplete
                                onKeyDown={preventNegative}
                                decimalPlaces={2}
                            />
                            <Input
                                label={`${monthName} - PT Count`}
                                name="pt_count"
                                value={formik.values.pt_count}
                                type="text"
                                autoComplete
                                onKeyDown={preventNegative}
                                onInput={numbersOnly}
                                min="0"
                            />
                        </Form>
                    </FormikProvider>
                    <Button
                        label="Next"
                        className="block w-full capitalize"
                        onClick={handleGenerateWigDashboard}
                        type="submit"
                    />
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
                    <h2 className="text-xl font-semibold mt-5 mb-2">
                        About WIG
                    </h2>
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

export default Step2;
