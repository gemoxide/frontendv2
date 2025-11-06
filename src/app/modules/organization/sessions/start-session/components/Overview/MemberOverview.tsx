import {
    ISessionMember,
    UpdateMemberSessionParam,
} from "../../../../../../core/interfaces/sessions.interface";
import debounce from "lodash/debounce";
import Checkbox from "../../../../../../core/components/Forms/CheckBox";
import { mapDispatchToProps } from "../../../../../../core/state/reducer/sessions";
import Button from "../../../../../../core/components/Button";
import { ROUTES } from "../../../../../../core/constants/routes";
import CustomIcon from "../../../../../../core/components/CustomIcon";
import { stringToCamelCase } from "../../../../../../core/helpers/camelCase";

interface Props {
    sessionId: number;
    member: ISessionMember;
    refreshMembers: () => void;
}

const MemberOverview: React.FC<Props> = ({
    sessionId,
    member,
    refreshMembers,
}) => {
    const { updateMemberSession } = mapDispatchToProps();

    const updateAssessment = (
        param: Omit<UpdateMemberSessionParam, "session_id" | "member_id">
    ) => {
        updateMemberSession({
            ...param,
            session_id: sessionId,
            member_id: member.id,
        });
    };

    const viewProfile = () => {
        window.open(ROUTES.USER.member.parse(member.id), "_blank");
    };

    const handleUpdateSessionMember = (name: string, value: boolean) => {
        updateAssessment({ [name]: value });
        refreshMembers();
    };

    return (
        <div className="flex flex-col gap-y-4 border border-solid rounded-[10px] border-grey p-4 w-full">
            <div className="flex md:flex-col gap-x-3 lg:flex-row">
                <img
                    src={member.attributes.avatar}
                    className="w-14 h-14 rounded-full md:ml-auto md:mr-auto lg:ml-0 lg:mr-0"
                    alt={`${member.attributes.first_name} ${member.attributes.last_name}`}
                />
                <div className="flex flex-col md:flex-row lg:flex-col md:justify-between justify-normal lg:justify-normal md:mt-5 lg:mt-0 md:items-center items-start lg:items-start">
                    <p className="text-secondary text-base font-semibold mb-1 truncate mr-0 md:mr-3 lg:mr-0">
                        {member.attributes.first_name}{" "}
                        {member.attributes.last_name}
                    </p>
                    <div className="flex flex-row gap-x-3">
                        {member?.attributes?.performance_test_type && (
                            <CustomIcon
                                icon={stringToCamelCase(
                                    member?.attributes?.performance_test_type
                                )}
                                className="w-7 h-7"
                            />
                        )}
                        {member?.attributes?.fms_level && (
                            <CustomIcon
                                icon={stringToCamelCase(
                                    member?.attributes?.fms_level
                                )}
                                className="w-7 h-7"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-row items-center justify-between">
                    <span>Membership</span>
                    <div className="flex flex-row-reverse items-center justify-between gap-x-1.5">
                        {member?.attributes?.has_active_membership && (
                            <CustomIcon icon="active" className="w-7 h-7" />
                        )}
                        {member?.attributes?.is_membership_frozen && (
                            <CustomIcon icon="frozen" className="w-7 h-7" />
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <span>Coaching</span>
                    <div className="flex flex-row-reverse items-center justify-between gap-x-1.5">
                        {member?.attributes?.has_active_coached_client && (
                            <CustomIcon icon="active" className="w-7 h-7" />
                        )}
                        {member?.attributes?.is_coached_client_frozen && (
                            <CustomIcon icon="frozen" className="w-7 h-7" />
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <span className="mb-4"> Health History</span>
                        <div className="flex flex-wrap items-center justify-start gap-x-1.5">
                            {member?.attributes?.has_heart_disease ? (
                                <CustomIcon
                                    icon="heartDisease"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_high_blood_pressure ? (
                                <CustomIcon
                                    icon="highBloodPressure"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_chest_pain ? (
                                <CustomIcon
                                    icon="chestPain"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_respiratory_disease ? (
                                <CustomIcon
                                    icon="respiratory"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_diabetes ? (
                                <CustomIcon
                                    icon="diabetes"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_surgeries ? (
                                <CustomIcon
                                    icon="surgery"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_loose_balance_dizziness ? (
                                <CustomIcon
                                    icon="dizziness"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_stroke ? (
                                <CustomIcon icon="stroke" className="w-7 h-7" />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_bone_joint_soft_tissue ? (
                                <CustomIcon
                                    icon="boneIssue"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_mental_health_learning_dis ? (
                                <CustomIcon
                                    icon="mentalHealth"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                            {member?.attributes?.has_other_med_conditions ? (
                                <CustomIcon
                                    icon="medicalCondition"
                                    className="w-7 h-7"
                                />
                            ) : (
                                <span className="w-7 h-7"></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex flex-col gap-y-3">
                <Checkbox
                    containerClassName="flex flex-row-reverse items-center justify-between mb-3"
                    label="Body Scan"
                    name="is_body_scanned"
                    defaultChecked={member.attributes.is_body_scanned}
                    variant="primary"
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const { checked } = e.target;
                            updateAssessment({
                                is_body_scanned: checked,
                                time_zone:
                                    Intl.DateTimeFormat().resolvedOptions()
                                        .timeZone,
                            });
                        },
                        500
                    )}
                    isNotFormHook
                />
                <Checkbox
                    containerClassName="flex flex-row-reverse items-center justify-between"
                    label="No Show"
                    name="is_no_show"
                    defaultChecked={member.attributes.is_no_show}
                    variant="primary"
                    onChange={debounce(
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const { checked } = e.target;
                            handleUpdateSessionMember("is_no_show", checked);
                        },
                        500
                    )}
                    isNotFormHook
                />
                <Button
                    variant="secondary"
                    label="View Profile"
                    className="font-bold text-secondary border-2 !capitalize"
                    onClick={viewProfile}
                />
            </div>
        </div>
    );
};

export default MemberOverview;
