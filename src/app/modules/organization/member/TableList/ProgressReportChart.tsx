import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { ProgressReportTableData } from "../../../../core/interfaces/group-assessments.interface";

interface Props {
    title: string;
    ticks: number[];
    domain: number[];
    data?: ProgressReportTableData[];
}

const ProgressReportChart: React.FC<Props> = ({ title, data, ticks, domain }) => {
    return (
        <div className="h-64">
            <p className="text-center text-secondary text-base font-semibold">
                {title}
            </p>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        bottom: 5,
						right: 0,
						left: -20
                    }}
					
					
                >
                    <XAxis
                        dataKey="name"
                        className="text-xs"
                        style={{
                            fontWeight: 700,
                        }}
                        tick={{ fill: "#00004D" }}
                        padding={{ left: 30, right: 30 }}
                    />
                    <YAxis
					
                        domain={domain}
                        ticks={ticks}
                        className="text-xs"
                        style={{
                            fontWeight: 700,
                        }}
                        tick={{ fill: "#00004D" }}
                    />
                    <Line dataKey="value" stroke="#00004D" strokeWidth={3} isAnimationActive={false}>
                        <LabelList
                            dataKey="value"
                            position="top"
                            fill="#00004D"
                            offset={10}
                            fontSize={12}
							fontWeight={700}
                        />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressReportChart;
