import ProgressBar from "../../../../../core/components/ProgressBar";
import Dumbbell from "../../../../../../../assets/icons/dumbbell.svg";
import People from "../../../../../../../assets/icons/people.svg";

type Props = {
    salesStatus?: string;
};

const JSProgress: React.FC<Props> = ({ salesStatus }) => {
    return (
        <div className="my-8 w-3/4">
            <p className="mb-2">
                Status:
                <span className="text-secondary font-bold">
                    {" " + salesStatus}
                </span>
            </p>
            <ProgressBar progress="90" />
            <div className="mt-2 flex justify-between">
                <div className="flex">
                    <img src={Dumbbell} className="mr-2" />
                    <span> 2 </span>
                </div>
                <div className="flex">
                    <img src={People} className="mr-2" />
                    <span> 2 </span>
                </div>
            </div>
        </div>
    );
};

export default JSProgress;
