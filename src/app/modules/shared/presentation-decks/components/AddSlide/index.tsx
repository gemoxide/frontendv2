import Button from "../../../../../core/components/Button";
import { ReactComponent as Plus } from "../../../../../../../assets/icons/plus.svg";

interface Props {
    isLast: boolean;
    onClick: () => void;
}

const AddSlide: React.FC<Props> = ({ isLast, onClick }) => {
    return (
        <div className="flex items-center">
            <div className="w-7 h-1.5 bg-primary"></div>
            <Button
                className="btn-primary"
                label={<Plus />}
                onClick={onClick}
            />
            {!isLast && <div className="w-7 h-1.5 bg-primary"></div>}
        </div>
    );
};

export default AddSlide;
