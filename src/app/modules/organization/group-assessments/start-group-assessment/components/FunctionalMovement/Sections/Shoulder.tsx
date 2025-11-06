import debounce from "lodash/debounce";
import Input from "../../../../../../../core/components/Forms/Input";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../../core/interfaces/group-assessments.interface";
import { preventNegative } from "../../../../../../../core/helpers/preventNegative";
import Select from "../../../../../../../core/components/Forms/Select";
import {
    fmsScoreDropdown,
    fmsScoreTooltip,
} from "../../../../../../../core/constants/fms-score";

interface Props {
    member: IGroupAssessmentMember;
    updateAssessment: (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => void;
}

const Shoulder: React.FC<Props> = ({ member, updateAssessment }) => {
    const handleUpdateAssessment = (name: string, value: number | string) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="border border-solid border-grey p-3 rounded-[10px]">
            <span>Shoulder</span>
            <div className="grid grid-cols-3 gap-3">
                <Input
                    label="Right"
                    type="number"
                    name="shoulder_right"
                    variant="primary"
                    defaultValue={member.attributes.shoulder_right}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("shoulder_right", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    className="row-span-2"
                    label="Left"
                    type="number"
                    name="shoulder_left"
                    variant="primary"
                    defaultValue={member.attributes.shoulder_left}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("shoulder_left", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Select
                    name="shoulder_score"
                    label="Score"
                    className="col-span-1"
                    options={fmsScoreDropdown}
                    placeHolder="Select Score"
                    tooltipPosition="left"
                    tooltip={fmsScoreTooltip}
                    defaultValue={member.attributes.shoulder_score}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLSelectElement>) => {
                            const value = Number(e.target.value);
                            handleUpdateAssessment("shoulder_score", value);
                        },
                        500
                    )}
                    autoComplete
                    isNotFormHook
                />
            </div>
            <Input
                label="Notes"
                className="mt-3"
                inputClassName="h-10"
                name="shoulder_notes"
                variant="primary"
                defaultValue={member.attributes.shoulder_notes}
                onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    handleUpdateAssessment("shoulder_notes", value);
                }, 500)}
                isNotFormHook
            />
        </div>
    );
};

export default Shoulder;
