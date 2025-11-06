import debounce from "lodash/debounce";
import Input from "../../../../../../../core/components/Forms/Input";
import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../../core/interfaces/group-assessments.interface";
import { preventNegative } from "../../../../../../../core/helpers/preventNegative";

interface Props {
    member: IGroupAssessmentMember;
    updateAssessment: (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => void;
}

const Measurements: React.FC<Props> = ({ member, updateAssessment }) => {
    const handleUpdateAssessment = (name: string, value: number) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="border border-solid border-grey p-3 rounded-[10px]">
            <span>Measurements</span>
            <div className="grid grid-cols-3 gap-3">
                <Input
                    label="Chest"
                    type="number"
                    name="chest"
                    variant="primary"
                    defaultValue={member.attributes.chest}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("chest", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    label="Waist"
                    type="number"
                    name="waist"
                    variant="primary"
                    defaultValue={member.attributes.waist}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("waist", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    label="Hips"
                    type="number"
                    name="hips"
                    variant="primary"
                    defaultValue={member.attributes.hips}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("hips", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    label="Minimum Weight"
                    type="number"
                    name="min_weight"
                    variant="primary"
                    defaultValue={member.attributes.min_weight}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("min_weight", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    label="Maximum Weight"
                    type="number"
                    name="max_weight"
                    variant="primary"
                    defaultValue={member.attributes.max_weight}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("max_weight", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
            </div>
        </div>
    );
};

export default Measurements;
