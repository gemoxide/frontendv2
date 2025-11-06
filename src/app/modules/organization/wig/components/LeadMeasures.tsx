import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { numbersOnly } from "../../../../core/helpers/numbersOnly";
import { preventNegative } from "../../../../core/helpers/preventNegative";
import Input from "../../../../core/components/Forms/Input";
import Button from "../../../../core/components/Button";
import {
    IGym,
    LeadMeasuresResponse,
    LeadMeasuresSandbox,
} from "../../../../core/interfaces/gyms.interface";
import { convertToDecimal } from "../../../../core/helpers/toPercent";
import {
    leadMeasuresRequest,
    setLeadMeasuresAsSalesTrackerRequest,
} from "../../../../core/services/gyms/gyms.service";
import { IGapAnalysis } from "../../../../core/interfaces/gym-revenue.interface";
import { toast } from "react-toastify";

type LeadMeasuresProps = {
    gym: IGym;
    gapAnalysis: IGapAnalysis;
};
export const LeadMeasures = ({ gym, gapAnalysis }: LeadMeasuresProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [leadMeasures, setLeadMeasures] = useState<LeadMeasuresResponse>();

    const currentMonth = new Date().toLocaleString("default", {
        month: "long",
    });
    const currentYear = new Date().getFullYear();
    const formattedMonth = `${currentMonth} ${currentYear}`;

    const formik = useFormik({
        initialValues: {
            proposed_new_membership_goals: Math.abs(
                gapAnalysis?.data?.membership?.agreements_needed || 0
            ).toString(),
            proposed_new_pt_goals:
                Math.abs(
                    gapAnalysis?.data?.pt?.agreements_needed || 0
                ).toString() || "0",
            lead_to_gym_tour_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox?.lead_to_gym_tour_rate ||
                    0
            ),
            gym_tour_show_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox?.gym_tour_show_rate || 0
            ),
            pos_membership_close_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox
                    ?.pos_membership_close_rate || 0
            ),
            js1_scheduled_at_pos_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox
                    ?.js1_scheduled_at_pos_rate || 0
            ),
            js1_show_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox?.js1_show_rate || 0
            ),
            fc_js3_scheduled_at_pos_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox
                    ?.fc_js3_scheduled_at_pos_rate || 0
            ),
            fc_js3_show_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox?.fc_js3_show_rate || 0
            ),
            js3_close_rate: convertToDecimal(
                gym?.attributes?.lead_measure_sandbox?.js3_close_rate || 0
            ),
        },
        onSubmit: () => {
            fetchLeadMeasures();
        },
    });

    const fetchLeadMeasures = async () => {
        try {
            setLoading(true);
            if (gym?.id) {
                const sanitizedValues = Object.entries(formik.values).reduce(
                    (acc, [key, value]) => ({
                        ...acc,
                        [key]:
                            typeof value === "string"
                                ? value.replace(/,/g, "")
                                : value,
                    }),
                    {}
                );

                const payload = {
                    gym_id: gym.id,
                    ...sanitizedValues,
                } as LeadMeasuresSandbox;

                const { data } = await leadMeasuresRequest(payload);
                setLeadMeasures(data);
                formik.setSubmitting(false);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            formik.setSubmitting(false);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleSetLeadMeasuresAsSalesTracker = async () => {
        if (!gym?.id) return;

        try {
            setLoading(true);
            const { data } = await setLeadMeasuresAsSalesTrackerRequest(gym.id);
            if (data) {
                toast.success("Lead measures set as sales tracker goals");
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeadMeasures();
    }, [gym?.id]);

    useEffect(() => {
        if (gapAnalysis?.data?.membership?.agreements_needed) {
            formik.setFieldValue(
                "proposed_new_membership_goals",
                Math.abs(
                    gapAnalysis?.data?.membership?.agreements_needed
                ).toString()
            );
        }
        if (gapAnalysis?.data?.pt?.agreements_needed) {
            formik.setFieldValue(
                "proposed_new_pt_goals",
                Math.abs(gapAnalysis.data.pt.agreements_needed).toString()
            );
        }
    }, [gapAnalysis]);

    return (
        <div className="bg-white p-4 rounded-md shadow-lg w-full">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-extrabold text-secondary">
                    Lead Measures
                </h1>
            </div>
            <div className="flex flex-col gap-y-4 mt-5">
                <FormikProvider value={formik}>
                    <Form>
                        <div className="flex gap-x-10 items-center">
                            <Input
                                label="Proposed New Membership Goals"
                                name="proposed_new_membership_goals"
                                value={
                                    formik.values.proposed_new_membership_goals
                                }
                                type="text"
                                autoComplete
                                onKeyDown={preventNegative}
                                onInput={numbersOnly}
                                min="0"
                                className="w-3/12"
                            />
                            <Input
                                label="Proposed New PT Goals"
                                name="proposed_new_pt_goals"
                                value={formik.values.proposed_new_pt_goals}
                                type="text"
                                autoComplete
                                onKeyDown={preventNegative}
                                onInput={numbersOnly}
                                min="0"
                                className="w-3/12"
                            />
                            <Button
                                label="Calculate"
                                type="submit"
                                className="w-1/12 mt-6"
                            />
                        </div>
                        <div className="flex gap-x-10 items-center mt-5">
                            <div className="w-3/12">
                                <div className="flex flex-col">
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>
                                            Rate that leads schedule a gym tour
                                        </span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.leads_schedule_a_gym_tour_rate ||
                                                0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>Gym tour show rate</span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.gym_tour_show_rate || 0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>POS membership close rate</span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.pos_membership_close_rate ||
                                                0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>
                                            Rate JS1 is scheduled at POS
                                        </span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.js1_scheduled_at_pos_rate ||
                                                0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>JS1 show rate</span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.js1_show_rate || 0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>
                                            Rate FC/JS3 is scheduled at JS1/POS
                                        </span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.fc_js3_scheduled_at_pos_rate ||
                                                0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>FC/JS3 show rate</span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.fc_js3_show_rate || 0}
                                            %
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-6 border-b border-grey text-xs">
                                        <span>FC/JS3 close rate</span>
                                        <span className="font-bold">
                                            {leadMeasures?.previous_month?.rates
                                                ?.js3_close_rate || 0}
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-6/12 text-sm">
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16 text-xl font-bold text-secondary">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.leads_required_to_reach_pt_goal ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            Leads Required
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16 text-xl font-bold text-secondary">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.leads_required_to_reach_pt_goal ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data?.leads_scheduled ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            Gym Tours Scheduled
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data?.leads_scheduled ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.leads_that_show_for_tour ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            Gym Tours Completed
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.leads_that_show_for_tour ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.leads_to_new_memberships ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            Gym Tours to New Memberships / FC
                                            Scheduled
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.leads_to_new_memberships ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.new_members_to_js1 || 0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            Gym Tour to JS1 / POS FC Scheduled
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.new_members_to_js1 || 0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.members_that_show_for_js1 ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            POS FC / JS1 Completed
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.members_that_show_for_js1 ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.members_scheduled_for_js3 ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            FC / JS3 Appointments Scheduled
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.members_scheduled_for_js3 ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data
                                                    ?.members_that_show_for_js3 ||
                                                    0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            FC / JS3 Appointments Completed
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data
                                                    ?.members_that_show_for_js3 ||
                                                    0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.previous_month
                                                    ?.data?.new_pt_goal || 0}
                                            </div>
                                        </div>
                                        <div className="w-1/2 text-center font-bold text-secondary">
                                            New PT Client Goal for{" "}
                                            {formattedMonth}
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <div className="bg-tertiary p-2 border rounded mx-auto w-16">
                                                {leadMeasures?.sandbox_rates
                                                    ?.data?.new_pt_goal || 0}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-3/12">
                                <div className="flex flex-col">
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="lead_to_gym_tour_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            disabled={loading}
                                            readonly={loading}
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                        />
                                        <span>
                                            Rate that leads schedule a gym tour
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="gym_tour_show_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>Gym tour show rate</span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="pos_membership_close_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>POS membership close rate</span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="js1_scheduled_at_pos_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>
                                            Rate JS1 is scheduled at POS
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="js1_show_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>JS1 show rate</span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="fc_js3_scheduled_at_pos_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>
                                            Rate FC/JS3 is scheduled at JS1/POS
                                        </span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="fc_js3_show_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>FC/JS3 show rate</span>
                                    </div>
                                    <div className="flex justify-between p-4 border-b border-grey text-xs items-center">
                                        <Input
                                            label=""
                                            name="js3_close_rate"
                                            size="custom"
                                            type="number"
                                            placeHolder="Enter Rate"
                                            autoComplete
                                            min="0"
                                            max="100"
                                            onInput={numbersOnly}
                                            onKeyDown={preventNegative}
                                            disabled={loading}
                                            readonly={loading}
                                        />
                                        <span>FC/JS3 close rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
            <div className="flex justify-end mt-5">
                <Button
                    label="Save Values as Sales Tracker Goals"
                    onClick={() => handleSetLeadMeasuresAsSalesTracker()}
                />
            </div>
        </div>
    );
};
