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

const Anterior: React.FC<Props> = ({ member, updateAssessment }) => {
    const handleUpdateAssessment = (name: string, value: boolean) => {
        updateAssessment({ [name]: value });
    };
    return (
        <div className="text-sm col-span-2">
            <label className="text-sm text-secondary font-bold">Anterior</label>
            <div className="grid grid-cols-4 gap-2">
                <div className="col-span-2"></div>
                <div className="text-center font-semibold">Right</div>
                <div className="text-center font-semibold">Left</div>
                <div className="col-span-3 font-bold">Feet</div>
                <div className="col-span-2">Turned Out</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_anterior_feet_turned_out_right"
                    defaultChecked={
                        member.attributes.is_anterior_feet_turned_out_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_anterior_feet_turned_out_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_anterior_feet_turned_out_left"
                    defaultChecked={
                        member.attributes.is_anterior_feet_turned_out_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_anterior_feet_turned_out_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />

                <div className="col-span-2">Flatten</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_anterior_feet_flatten_right"
                    defaultChecked={
                        member.attributes.is_anterior_feet_flatten_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_anterior_feet_flatten_right",
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
                <div className="col-span-3 font-bold">Knees</div>
                <div className="col-span-2">Move Inward</div>
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_anterior_knees_move_inward_right"
                    defaultChecked={
                        member.attributes.is_anterior_knees_move_inward_right
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_anterior_knees_move_inward_right",
                            checked
                        );
                    }}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex items-center justify-center"
                    name="is_anterior_knees_move_inward_left"
                    defaultChecked={
                        member.attributes.is_anterior_knees_move_inward_left
                    }
                    variant="primary"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { checked } = e.target;
                        handleUpdateAssessment(
                            "is_anterior_knees_move_inward_left",
                            checked
                        );
                    }}
                    isNotFormHook
                />
            </div>
        </div>
    );
};

export default Anterior;
