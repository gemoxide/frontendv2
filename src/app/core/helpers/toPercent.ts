export const convertToPercent = (num: number) => {
    return num / 100;
};

export const convertToDecimal = (num: number) => {
    return (num * 100).toFixed(2);
};
