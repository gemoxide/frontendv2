type Props = {
    error?: any;
};

const CustomErrorText: React.FC<Props> = ({ error }) => {
    return <div className="text-error text-xs ml-4">{error} </div>;
};

export default CustomErrorText;
