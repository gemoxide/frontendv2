import React, { useState, useEffect } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import Select from "../../../../core/components/Forms/Select";
import Button from "../../../../core/components/Button";
import { IGym } from "../../../../core/interfaces/gyms.interface";
type Props = {
    gymData?: IGym;
    onClickNext: (payload: any) => void;
};
const Step1: React.FC<Props> = ({ gymData, onClickNext }) => {
    const formik = useFormik({
        initialValues: {
            wig_start_date: gymData?.attributes.wig_start_date
                ? String(
                      Number(gymData.attributes.wig_start_date.split("-")[1])
                  )
                : "1",
            wig_start_year:
                gymData?.attributes.wig_start_year || new Date().getFullYear(),
            wig_duration: gymData?.attributes.wig_duration || null,
        },
        onSubmit: (values) => {
            const duration = Number(values.wig_duration);
            const formattedStartDate = `${values.wig_start_year}-${String(
                values.wig_start_date
            ).padStart(2, "0")}`;

            const payload = {
                ...values,
                wig_start_date: formattedStartDate,
                wig_duration: duration,
            };

            onClickNext(payload);
        },
    });

    const durationOptions = Array.from({ length: 11 }, (_, i) => i + 2).map(
        (months) => ({
            label: `${months} Month${months > 1 ? "s" : ""}`,
            value: months,
        })
    );

    return (
        <div className="max-w-4xl mx-auto py-4 px-14">
            <h1 className="text-2xl font-extrabold mb-8">
                <span className="text-gray-500">Step 1: </span>
                <span>Set your start date and goals</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-20">
                {/* First Column */}
                <div className="flex-1">
                    <FormikProvider value={formik}>
                        <Form
                            onSubmit={formik.handleSubmit}
                            className="space-y-4 w-full mb-5"
                        >
                            {/* Create a flex container for month and year */}
                            <div className="flex gap-x-4">
                                <div className="flex-1">
                                    <Select
                                        label="Start Month"
                                        name="wig_start_date"
                                        autoComplete
                                        variant="primary"
                                        options={Array.from(
                                            { length: 12 },
                                            (_, i) => ({
                                                label: new Date(
                                                    0,
                                                    i
                                                ).toLocaleString("default", {
                                                    month: "long",
                                                }),
                                                value: i + 1,
                                            })
                                        )}
                                        placeHolder="Select month"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Select
                                        label="Start Year"
                                        name="wig_start_year"
                                        autoComplete
                                        variant="primary"
                                        options={[
                                            {
                                                label: new Date()
                                                    .getFullYear()
                                                    .toString(),
                                                value: new Date().getFullYear(),
                                            },
                                            {
                                                label: (
                                                    new Date().getFullYear() - 1
                                                ).toString(),
                                                value:
                                                    new Date().getFullYear() -
                                                    1,
                                            },
                                        ]}
                                        placeHolder="Select year"
                                    />
                                </div>
                            </div>

                            <Select
                                label="Duration"
                                name="wig_duration"
                                autoComplete
                                variant="primary"
                                options={durationOptions}
                                placeHolder="Select duration"
                            />

                            <Button
                                label="Next"
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

export default Step1;
