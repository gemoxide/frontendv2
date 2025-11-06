import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface BarGraphProps {
    data: any[];
    xKey: string;
    yKey: string;
    xLabel: string;
    yLabel: string;
    title: string;
}

const BarGraph: React.FC<BarGraphProps> = ({
    data,
    xKey,
    yKey,
    xLabel,
    yLabel,
    title,
}) => {
    const renderCustomShape = (props: any) => {
        const { x, y, width, height, fill } = props;

        return (
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={8}
                ry={8}
                fill={fill}
            />
        );
    };
    return (
        <div className="w-full">
            <p className="text-secondary text-base font-semibold mb-5">
                {title}
            </p>
            <BarChart width={750} height={300} data={data}>
                <XAxis
                    dataKey={xKey}
                    label={{ value: xLabel, position: "insideBottom" }}
                    axisLine={false}
                    tick={{ stroke: "none" }}
                    tickLine={false}
                />
                <YAxis
                    label={{
                        value: yLabel,
                        angle: -90,
                        position: "insideLeft",
                    }}
                    axisLine={false}
                    tick={{ stroke: "none" }}
                    tickLine={false}
                />
                <Bar
                    dataKey={yKey}
                    fill="#99E6FF"
                    barSize={15}
                    shape={renderCustomShape}
                />
            </BarChart>
        </div>
    );
};

export default BarGraph;
