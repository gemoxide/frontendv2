import React from "react";
import { IGapAnalysis } from "../../../../core/interfaces/gym-revenue.interface";
import Loader from "../../../../core/components/Loader";
import { formatCurrency } from "../../../../core/helpers/formatCurrency";
import { IGym } from "../../../../core/interfaces/gyms.interface";

type Props = {
    loading: boolean;
    data: IGapAnalysis;
    gymData: IGym;
};

const GapAnalysis: React.FC<Props> = ({ loading, data, gymData }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-lg w-full">
            {loading ? (
                <div className="flex justify-center items-center h-24">
                    <Loader />
                </div>
            ) : (
                <div className="flex justify-between gap-x-10">
                    <div className="w-1/2">
                        <div className="rounded-tl-lg rounded-tr-lg bg-tertiary p-4 border-b-8 border-grey">
                            <div className="flex items-center justify-between">
                                <h1 className="text-md font-extrabold">
                                    Sub WIG 1 - Monthly Membership Growth
                                </h1>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    Average Membership:{" "}
                                    <span className="ms-2 font-bold">
                                        {formatCurrency(
                                            gymData?.attributes
                                                ?.wig_membership_average_value ||
                                                0
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>
                                Projected Membership Draft for{" "}
                                {data?.data?.current_month_year}
                            </span>
                            <span className="font-bold">
                                {formatCurrency(
                                    data?.data?.membership?.last_month
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>
                                Membership Draft for{" "}
                                {data?.data?.previous_month_year}
                            </span>
                            <span className="font-bold">
                                {formatCurrency(
                                    data?.data?.membership?.first_month
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>Membership Gap</span>
                            <span className="font-bold">
                                {formatCurrency(data?.data?.membership?.gap)}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>Agreements needed to meet Member Goal</span>
                            <span className="font-bold">
                                {data?.data?.membership?.agreements_needed}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 text-xs">
                            <span>Projected New Member Draft</span>
                            <span className="font-bold">
                                {formatCurrency(
                                    data?.data?.membership
                                        ?.projected_new_member_draft
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="rounded-tl-lg rounded-tr-lg bg-tertiary p-4 border-b-8 border-grey">
                            <div className="flex items-center justify-between">
                                <h1 className="text-md font-extrabold">
                                    Sub WIG 2 - Monthly Pesonal Training Growth
                                </h1>
                                <div className="flex flex-row justify-between items-center text-sm">
                                    Average PT Agreement:{" "}
                                    <span className="ms-2 font-bold">
                                        {formatCurrency(
                                            gymData?.attributes
                                                ?.wig_pt_average_value || 0
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>
                                Projected Personal Training Draft for{" "}
                                {data?.data?.current_month_year}
                            </span>
                            <span className="font-bold">
                                {formatCurrency(data?.data?.pt?.last_month)}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>
                                Personal Training Draft for{" "}
                                {data?.data?.previous_month_year}
                            </span>
                            <span className="font-bold">
                                {formatCurrency(data?.data?.pt?.first_month)}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>Personal Training Gap</span>
                            <span className="font-bold">
                                {formatCurrency(data?.data?.pt?.gap)}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 border-b border-grey text-xs">
                            <span>Agreements needed to meet PT Goal</span>
                            <span className="font-bold">
                                {data?.data?.pt?.agreements_needed}
                            </span>
                        </div>
                        <div className="flex justify-between p-4 text-xs">
                            <span>Projected New Personal Training Draft</span>
                            <span className="font-bold">
                                {formatCurrency(
                                    data?.data?.pt?.projected_new_member_draft
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GapAnalysis;
