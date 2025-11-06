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

const Posterior: React.FC<Props> = ({ member, updateAssessment }) => {
    const handleUpdateAssessment = (name: string, value: boolean) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="text-sm col-span-2">
            <label className="text-sm text-secondary font-bold">
                Posterior
            </label>
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2"></div>
                <div className="text-center font-semibold">Right</div>
                <div className="text-center font-semibold">Left</div>
                <div className="col-span-3 font-bold">Feet</div>
                <div className="col-span-2">Flatten</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_posterior_feet_flatten_right"
                    defaultChecked={
                        member.attributes.is_posterior_feet_flatten_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_posterior_feet_flatten_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_posterior_feet_flatten_left"
                    defaultChecked={
                        member.attributes.is_posterior_feet_flatten_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_posterior_feet_flatten_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <div className="col-span-3 font-bold">LPHC</div>
                <div className="col-span-2">Asymmetric Weight Shift</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_posterior_lphc_asymmetric_weight_shift_right"
                    defaultChecked={
                        member.attributes
                            .is_posterior_lphc_asymmetric_weight_shift_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_posterior_lphc_asymmetric_weight_shift_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_posterior_lphc_asymmetric_weight_shift_left"
                    defaultChecked={
                        member.attributes
                            .is_posterior_lphc_asymmetric_weight_shift_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_posterior_lphc_asymmetric_weight_shift_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />
            </div>
        </div>
    );
};

export default Posterior;
