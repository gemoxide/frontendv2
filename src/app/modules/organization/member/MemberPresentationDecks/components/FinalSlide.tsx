import Button from "../../../../../core/components/Button";
import {ReactComponent as FinalSlideThankYou} from "../../../../../../../assets/img/final_slide_9_12.svg";

interface Props {
    isCurrent?: boolean;
    completeDeck: () => void;
}

const FinalSlide: React.FC<Props> = ({ completeDeck, isCurrent }) => {
    return (
        <div className={`h-full flex-col ${isCurrent ? "flex" : "hidden"}`}>
            <div className="flex flex-col gap-y-1 grow h-auto overflow-y-auto w-full items-center">
                <FinalSlideThankYou className="mb-5 max-w-[500px]" />
                <h3 className="font-bold text-4xl mb-2">Thank you!</h3>
                <p className="text-lg">Your submission has been saved. </p>
                <p className="font-bold text-lg">
                    Please return the device to the staff member .
                </p>
            </div>
            <div className="flex justify-end w-full">
                <Button
                    variant="primary"
                    label="Done"
                    type="button"
                    onClick={completeDeck}
                />
            </div>
        </div>
    );
};

export default FinalSlide;
