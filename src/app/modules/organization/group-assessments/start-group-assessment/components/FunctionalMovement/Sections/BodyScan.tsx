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

const BodyScan: React.FC<Props> = ({ member, updateAssessment }) => {
    const handleUpdateAssessment = (name: string, value: number) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="border border-solid border-grey p-3 rounded-[10px]">
            <span>Body Scan</span>
            <div className="grid grid-cols-3 gap-3">
                <Input
                    label="Weight"
                    type="number"
                    name="weight"
                    variant="primary"
                    defaultValue={member.attributes.weight}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("weight", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    className="row-span-2"
                    label="Muscle Mass"
                    type="number"
                    name="muscle_mass"
                    variant="primary"
                    defaultValue={member.attributes.muscle_mass}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("muscle_mass", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    className="row-span-2"
                    label="Fat Mass"
                    type="number"
                    name="fat_mass"
                    variant="primary"
                    defaultValue={member.attributes.fat_mass}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("fat_mass", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />
                <Input
                    className="row-span-2"
                    label="% Body Fat"
                    type="number"
                    name="percent_body_fat"
                    variant="primary"
                    defaultValue={member.attributes.percent_body_fat}
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = parseFloat(e.target.value);
                            handleUpdateAssessment("percent_body_fat", value);
                        },
                        500
                    )}
                    onKeyDown={preventNegative}
                    min="0"
                    isNotFormHook
                />{" "}
            </div>
        </div>
    );
};

export default BodyScan;
