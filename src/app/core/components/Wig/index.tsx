import React from "react";
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from "recharts";
import { convertToCurrency } from "../../services/utils/utils.service";

type DataItem = {
    name: string;
    value: number | undefined;
};

type Item = {
    data: DataItem[];
    goal: string;
    total: string;
    percentage_to_goal: string;
    end_date_formatted: string;
};

interface Props {
    data: Item;
    isCenter?: boolean;
}

const COLORS = ["#99E6FF", "#00004D", "#D9D9D9"];

const Wig: React.FC<Props> = ({ data, isCenter = false }) => {
    const className = isCenter ? "text-center" : "text-start";
    return (
        <div className="rounded-lg bg-white p-5 w-full">
            <h3 className={`text-secondary ${className} font-semibold mb-2.5`}>
                Wildly Important Goal
            </h3>
            <hr className="bg-[#E1E1FB]" />
            {/* if data values are 0 display text only */}
            {data?.data?.every((entry) => entry.value === 0) ? (
                <div className="flex flex-col items-center justify-center h-auto p-6">
                    <p className="text-xs">No record to display</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                        <Pie
                            data={data.data}
                            innerRadius={100}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            cx="50%"
                            cy="85%"
                        >
                            {data?.data?.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                            <Label
                                value="$0"
                                position="center"
                                dx={-110}
                                dy={10}
                                fontSize={10}
                            ></Label>
                            <Label
                                value={convertToCurrency(data.goal)}
                                position="center"
                                dx={110}
                                dy={10}
                                fontSize={10}
                            ></Label>
                            <Label
                                value={convertToCurrency(data.total)}
                                position="center"
                                className="text-3xl font-black"
                                dy={-40}
                                fill="#00004D"
                            ></Label>
                            <Label
                                value={`You will reach ${data.percentage_to_goal}`}
                                position="center"
                                className="text-xs font-semibold"
                                dy={-5}
                            ></Label>
                            <Label
                                value={`of your goal by ${data.end_date_formatted}`}
                                position="center"
                                className="text-xs font-semibold"
                                dy={10}
                            ></Label>
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default Wig;
