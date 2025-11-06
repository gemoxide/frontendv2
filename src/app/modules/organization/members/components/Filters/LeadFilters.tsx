import Select from "../../../../../core/components/Forms/Select";
import { leadSourceDropdown } from "../../../../../core/constants/lead-source";
import { perPageDropdown } from "../../../../../core/constants/per-page";
import { gymTourDropdown } from "../../../../../core/constants/gym-tour";

type GymOption = {
    label: string;
    value: number;
};

type Props = {
    setLeadSource: React.Dispatch<React.SetStateAction<string>>;
    leadSource: string;
    gymOptions?: GymOption[];
    setGym: React.Dispatch<React.SetStateAction<number | undefined>>;
    gym?: number;
    gymTour: string;
    setGymTour: React.Dispatch<React.SetStateAction<string>>;
};

const LeadFilters: React.FC<Props> = ({
    leadSource,
    setLeadSource,
    gymOptions,
    setGym,
    gym,
    gymTour,
    setGymTour,
}) => {
    return (
        <div className="shadow-lg rounded-md bg-white h-full p-6 flex items-center">
            <div className="w-1/4">
                <p className="font-bold text-xl"> Filters</p>
            </div>
            <div className="w-full flex justify-end gap-x-2">
                <Select
                    placeHolder="Location"
                    inputClassName="w-full"
                    name="location"
                    variant="default"
                    isNotFormHook
                    options={gymOptions}
                    value={gym}
                    onChange={(e) => {
                        const val = Number(e.currentTarget.value);
                        setGym(val > 0 ? val : undefined);
                    }}
                />
                <Select
                    placeHolder="Lead Source"
                    inputClassName="w-full"
                    name="Member type"
                    variant="default"
                    isNotFormHook
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    options={leadSourceDropdown}
                />
                <Select
                    placeHolder="Gym Tour"
                    inputClassName="w-full"
                    name="Gym Tour"
                    variant="default"
                    isNotFormHook
                    value={gymTour}
                    onChange={(e) => setGymTour(e.target.value)}
                    options={gymTourDropdown}
                />
            </div>
        </div>
    );
};

export default LeadFilters;
