import React from "react";
import CustomRadialBar from "../CustomRadialBar";

type Item = {
    name: string;
    value: number;
};
interface Props {
    data: Item;
}

const PercentageTiles: React.FC<Props> = ({ data }) => {
    return <CustomRadialBar data={data} />;
};

export default PercentageTiles;
