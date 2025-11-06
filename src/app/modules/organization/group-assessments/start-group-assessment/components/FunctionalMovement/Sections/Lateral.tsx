import debounce from "lodash/debounce";
import Checkbox from "../../../../../../../core/components/Forms/CheckBox";

import {
    IGroupAssessmentMember,
    UpdateMemberAssessmentParam,
} from "../../../../../../../core/interfaces/group-assessments.interface";

interface Props {
    member: IGroupAssessmentMember;
    updateAssessment: (
        param: Omit<
            UpdateMemberAssessmentParam,
            "group_assessment_id" | "member_id"
        >
    ) => void;
}

const Lateral: React.FC<Props> = ({
    member,
    updateAssessment,
}) => {
    const handleUpdateAssessment = (name: string, value: boolean) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="text-sm col-span-2">
            <label className="text-sm text-secondary font-bold">Lateral</label>
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2"></div>
                <div className="text-center font-semibold">Right</div>
                <div className="text-center font-semibold">Left</div>
                <div className="col-span-3 font-bold">LPHC</div>
                <div className="col-span-2">Excessive Forward Lean</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_lateral_lphc_excessive_forward_lean_right"
                    defaultChecked={
                        member.attributes
                            .is_lateral_lphc_excessive_forward_lean_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_lateral_lphc_excessive_forward_lean_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_lateral_lphc_excessive_forward_lean_left"
                    defaultChecked={
                        member.attributes
                            .is_lateral_lphc_excessive_forward_lean_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_lateral_lphc_excessive_forward_lean_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />

                <div className="col-span-2">Lower Back Arches</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_lateral_lphc_lower_back_arches_right"
                    defaultChecked={
                        member.attributes
                            .is_lateral_lphc_lower_back_arches_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_lateral_lphc_lower_back_arches_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_anterior_feet_flatten_left"
                    defaultChecked={
                        member.attributes.is_anterior_feet_flatten_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_anterior_feet_flatten_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <div className="col-span-3 font-bold">Shoulder Complex</div>
                <div className="col-span-2">Arms Fall Forward</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_lateral_shoulder_complex_arms_fall_forward_right"
                    defaultChecked={
                        member.attributes
                            .is_lateral_shoulder_complex_arms_fall_forward_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_lateral_shoulder_complex_arms_fall_forward_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_lateral_shoulder_complex_arms_fall_forward_left"
                    defaultChecked={
                        member.attributes
                            .is_lateral_shoulder_complex_arms_fall_forward_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_lateral_shoulder_complex_arms_fall_forward_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />
            </div>
        </div>
    );
};

export default Lateral;
