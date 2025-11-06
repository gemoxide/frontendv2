import Skeleton from "react-loading-skeleton";

export const InputLoader = () => {
    return (
        <div>
            <Skeleton width={"10%"} />
            <Skeleton width={"30%"} height={30} />
        </div>
    );
};
const FormLoader = ({ count = 6 }: { count?: number }) => {
    const countArray = Array(count).fill({});
    return (
        <>
            {countArray?.map(() => (
                <InputLoader />
            ))}
        </>
    );
};

export default FormLoader;
