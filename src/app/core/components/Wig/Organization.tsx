import React from "react";
import {
    BarChart,
    Bar,
    YAxis,
    XAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import {
    convertToCurrency,
    snakeCaseToTitleCase,
} from "../../services/utils/utils.service";

interface Props {
    data: any;
}

const formatCurrency = (value: any) => `$${value}`;

const CustomToolTip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const renderData = payload.map((item: any, index: number) => {
            const colorStyle = { color: `${item.color}` };
            return (
                <p key={index} className="text-xs flex justify-between">
                    <span className="font-bold" style={colorStyle}>
                        {snakeCaseToTitleCase(item.name)}:
                    </span>
                    <span className="font-bold">
                        {convertToCurrency(item.value)}
                    </span>
                </p>
            );
        });

        return (
            <div className="p-3 bg-white flex flex-col space-y-2 w-56">
                <h3 className="text-sm font-semibold">{label}</h3>
                {renderData}
            </div>
        );
    }

    return null;
};

const OrganizationWig: React.FC<Props> = ({ data }) => {
    return (
        <div className="rounded-lg bg-white p-5 w-full">
            <h3 className="text-secondary font-semibold mb-2.5">
                Location WIG Progress
            </h3>
            <hr className="bg-[#E1E1FB]" />
            {/* if data values are 0 display text only */}

            <ResponsiveContainer width="100%" height={180}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 45,
                        left: -70,
                        bottom: 0,
                    }}
                    layout="vertical"
                >
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 400 }}
                        width={200}
                    />
                    <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 700 }}
                        tickFormatter={formatCurrency}
                    />
                    <Tooltip content={<CustomToolTip />} />
                    <Bar
                        dataKey="membership_revenue"
                        stackId="a"
                        fill="#99E6FF"
                        barSize={15}
                    />
                    <Bar
                        dataKey="pt_revenue"
                        stackId="a"
                        fill="#00004D"
                        barSize={15}
                    />
                    <Bar
                        dataKey="remaining"
                        stackId="a"
                        fill="#D9D9D9"
                        barSize={15}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrganizationWig;
