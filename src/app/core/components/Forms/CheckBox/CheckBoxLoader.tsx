import Skeleton from "react-loading-skeleton";

const CheckBoxLoader = () => {
    return (
        <div className="flex items-center my-4">
            <div className="mr-4">
                <Skeleton className="w-4 h-4" />
            </div>
            <div>
                <Skeleton className="w-40 h-4" />
            </div>
        </div>
    );
};

export default CheckBoxLoader;
