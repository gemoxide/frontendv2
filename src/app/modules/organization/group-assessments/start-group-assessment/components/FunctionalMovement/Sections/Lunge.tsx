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

const Lunge: React.FC<Props> = ({ member, updateAssessment }) => {
    const handleUpdateAssessment = (name: string, value: number | string) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="border border-solid border-grey p-3 rounded-[10px]">
            <span>Lunge</span>
            <div className="grid grid-cols-3 gap-3">
                <Input
                    label="Right"
                    type="number"
                    name="lunge_right"
                    variant="primary"
                    defaultValue={member.attributes.lunge_right}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("lunge_right", value);
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
                    name="lunge_left"
                    variant="primary"
                    defaultValue={member.attributes.lunge_left}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("lunge_left", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Select
                    name="lunge_score"
                    label="Score"
                    className="col-span-1"
                    options={fmsScoreDropdown}
                    placeHolder="Select Score"
                    tooltip={fmsScoreTooltip}
                    defaultValue={member.attributes.lunge_score}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLSelectElement>) => {
                            const value = Number(e.target.value);
                            handleUpdateAssessment("lunge_score", value);
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
                name="lunge_notes"
                variant="primary"
                defaultValue={member.attributes.lunge_notes}
                onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    handleUpdateAssessment("lunge_notes", value);
                }, 500)}
                isNotFormHook
            />
        </div>
    );
};

export default Lunge;
