import { Dispatch, SetStateAction } from "react";
import Select from "../../../../../core/components/Forms/Select";
import Input from "../../../../../core/components/Forms/Input";

type ISelectProps = {
    label: string;
    value: number;
}[];

type Props = {
    mode: string;
    type: string;
    userId: string;
    assessmentDate: string;
    setMode: Dispatch<SetStateAction<string>>;
    setType: Dispatch<SetStateAction<string>>;
    setUserId: Dispatch<SetStateAction<string>>;
    setAssessmentDate: Dispatch<SetStateAction<string>>;
    getAssessmentsLoading: boolean;
    gymUsersLoading: boolean;
    coachOptions?: ISelectProps;
    assessmentTypeOptions?: ISelectProps;
    assessmentModeOptions?: ISelectProps;
};

const GroupAssessmentFilters: React.FC<Props> = ({
    mode,
    type,
    userId,
    assessmentDate,
    setMode,
    setType,
    setUserId,
    getAssessmentsLoading,
    gymUsersLoading,
    coachOptions,
    assessmentTypeOptions,
    assessmentModeOptions,
    setAssessmentDate,
}) => {
    return (
        <div className="shadow-lg rounded-md bg-white h-full p-6 flex items-center">
            <div className="w-1/4">
                <p className="font-bold text-xl"> Filters</p>
            </div>
            <div className="w-full flex justify-end gap-x-2">
                <Select
                    disabled={getAssessmentsLoading}
                    placeHolder="Assessment Type"
                    inputClassName="w-full"
                    name="assessment_type"
                    variant="default"
                    isNotFormHook
                    options={assessmentTypeOptions}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <Select
                    disabled={getAssessmentsLoading}
                    placeHolder="Assessment Mode"
                    inputClassName="w-full"
                    name="assessment_mode"
                    variant="default"
                    isNotFormHook
                    options={assessmentModeOptions}
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                />

                <Select
                    disabled={gymUsersLoading}
                    placeHolder="Assigned To"
                    inputClassName="w-full"
                    name="user_id"
                    variant="default"
                    isNotFormHook
                    options={coachOptions}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <Input
                    placeHolder="Assessment Date"
                    inputClassName="w-full"
                    name="assessment_at"
                    variant="default"
                    isNotFormHook
                    type="date"
                    value={assessmentDate}
                    onChange={(e) => setAssessmentDate(e.target.value)}
                />
            </div>
        </div>
    );
};

export default GroupAssessmentFilters;
