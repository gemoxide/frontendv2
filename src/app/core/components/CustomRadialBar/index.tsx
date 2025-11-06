import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

interface DataItem {
    name: string;
    value: number;
}

interface Props {
    data: DataItem;
}

const CustomRadialBar: React.FC<Props> = ({ data }) => {
    return (
        <div className="rounded-lg bg-white p-5 w-full lg:w-3/12">
            <h3 className="text-secondary font-semibold mb-2.5 truncate">
                {data?.name ?? ""}
            </h3>
            <hr className="bg-[#E1E1FB]" />
            <ResponsiveContainer width="100%" height={205}>
                <RadialBarChart
                    width={270}
                    height={200}
                    cx="50%"
                    cy="55%"
                    innerRadius={80}
                    outerRadius={140}
                    barSize={20}
                    data={data ? [data] : []}
                    startAngle={90}
                    endAngle={450}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar background dataKey="value" fill="#99E6FF" />
                    <text
                        x="50%"
                        y="57%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="progress-label text-secondary text-4xl font-black"
                    >
                        {data?.value ?? 0}%
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomRadialBar;
