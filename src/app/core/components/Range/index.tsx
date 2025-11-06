import React, { FC } from "react";

type Props = {
    label?: string;
    name?: string;
    value: number;
    onChange: (value: number) => void;
    isLabelDisplayed?: boolean;
    size?: "xs" | "sm" | null;
    min?: number;
    max?: number;
    step?: number;
};

const Range: FC<Props> = ({
    label,
    name,
    value,
    onChange,
    isLabelDisplayed = true,
    size = null,
    min = 0.25,
    max = 100,
    step = 0.25,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        onChange(newValue);
    };

    const sizeClass = {
        xs: "w-full h-1 bg-primary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer",
        sm: "w-full h-2 bg-primary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer",
        default:
            "w-full h-3 bg-primary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer",
    };

    return (
        <div className="w-full">
            {isLabelDisplayed && (
                <div className="flex justify-between mb-3">
                    <span className="text-sm text-secondary font-bold">
                        {label || ""}
                    </span>
                    <span className="text-sm text-secondary font-bold">
                        {value.toFixed(2)}%
                    </span>
                </div>
            )}

            <input
                type="range"
                name={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                className={sizeClass[size || "default"]}
            />
            <div className="flex justify-between mt-2">
                <span className="text-sm text-secondary font-bold">
                    {min.toFixed(2)}%
                </span>
                <span className="text-sm text-secondary font-bold">{max}%</span>
            </div>
        </div>
    );
};

export default Range;
