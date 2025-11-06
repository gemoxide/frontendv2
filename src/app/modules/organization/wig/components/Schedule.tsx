import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { IGymMonthlyWig } from "../../../../core/interfaces/gym-revenue.interface";

type Props = {
    wigData?: IGymMonthlyWig;
    setSelectedMonth: (month: any) => void;
};

const Schedule: React.FC<Props> = ({ wigData, setSelectedMonth }) => {
    const formatCurrency = (value: any) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };
    return (
        <div>
            <div className="bg-white p-4 rounded-md shadow-lg w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-extrabold text-secondary">
                        Schedule
                    </h1>
                </div>
                <div className="flex flex-row w-full space-x-10">
                    <div className="flex flex-col space-y-1 font-semibold font-secondary text-sm pt-10 w-3/12">
                        <span>Membership Revenue</span>
                        <span>Membership Count</span>
                        <span>PT Revenue</span>
                        <span>PT Count</span>
                    </div>
                    <div className="overflow-x-auto w-full pb-2">
                        <div className="flex flex-row space-x-2 min-w-max">
                            {wigData?.data?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col border border-solid rounded-[10px] border-grey pl-6 pr-4 py-2 gap-y-3 w-28 ${
                                        item?.id === null
                                            ? "bg-white"
                                            : "bg-tertiary"
                                    }`}
                                >
                                    <div className="text-secondary text-sm font-extrabold flex justify-around space-x-1">
                                        <span>{item?.month}</span>
                                        <PencilSquareIcon
                                            className="w-5 h-5 text-primary font-bold"
                                            role="button"
                                            onClick={() =>
                                                setSelectedMonth(item)
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1 font-semibold text-secondary text-sm">
                                        <div className="text-right">
                                            {formatCurrency(
                                                item?.membership_revenue
                                            )}
                                        </div>
                                        <div className="text-right">
                                            {item?.membership_count}
                                        </div>
                                        <div className="text-right">
                                            {formatCurrency(item?.pt_revenue)}
                                        </div>
                                        <div className="text-right">
                                            {item?.pt_count}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
