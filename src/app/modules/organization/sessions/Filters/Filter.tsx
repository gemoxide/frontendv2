import Select from "../../../../core/components/Forms/Select";
import { dateOptions } from "../../../../core/constants/session-options";

type CoachOptions = {
    label: string;
    value: number;
};

type Props = {
    setCoach: React.Dispatch<React.SetStateAction<string | undefined>>;
    coachOptions?: CoachOptions[];
    coach?: string;
    setDates: React.Dispatch<React.SetStateAction<string>>;
    dates?: string;
};

const Filters: React.FC<Props> = ({
    setCoach,
    setDates,
    coachOptions,
    coach,
    dates,
}) => {
    return (
        <div className="shadow-lg rounded-md bg-white h-full p-6 flex items-center">
            <div className="w-1/4">
                <p className="font-bold text-xl"> Filters</p>
            </div>
            <div className="w-full flex justify-end gap-x-2">
                <Select
                    placeHolder="All Coaches"
                    inputClassName="w-full"
                    name="coach"
                    variant="default"
                    isNotFormHook
                    options={coachOptions}
                    value={coach}
                    onChange={(e) => {
                        setCoach(e.currentTarget.value);
                    }}
                />

                <Select
                    placeHolder="All Sessions"
                    inputClassName="w-full"
                    name="dates"
                    variant="default"
                    isNotFormHook
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    options={dateOptions}
                />
            </div>
        </div>
    );
};

export default Filters;
