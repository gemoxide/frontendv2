import { useState, useCallback, useEffect } from "react";
import TextBadge from "../../../../../core/components/TextBadge";
import MemberAvatar from "../../../../../../../assets/icons/member-avatar-place-holder.svg";
import MemberAvatarUpload from "../../../../../core/components/MemberAvatarUpload";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/members";
import { toast } from "react-toastify";
import { IMember } from "../../../../../core/interfaces/members.interface";
import CustomIcon from "../../../../../core/components/CustomIcon";
import { stringToCamelCase } from "../../../../../core/helpers/camelCase";
import Button from "../../../../../core/components/Button";
import { dateWithDot } from "../../../../../core/services/utils/utils.service";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../../core/constants/routes";

type Props = {
    id?: string;
    leadSource: string;
    isEdit?: boolean;
    onEditClick?: () => void;
    onViewClick?: () => void;
    avatar?: string;
    member?: IMember;
};
const ProfileCard: React.FC<Props> = ({
    id,
    avatar,
    leadSource,
    isEdit = true,
    onEditClick,
    member,
    onViewClick,
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<any>();

    const { loading: updateAvatarLoading, success: updateAvatarSuccess } =
        useSelector((state: RootState) => state.members.updateMemberAvatar);

    const { updateMemberAvatar, resetUpdateMemberAvatar } =
        mapDispatchToProps();

    // const onDrop = useCallback((acceptedFiles: File[]) => {
    //     console.log(id, acceptedFiles);
    //     setUploadedFiles(acceptedFiles);
    //     const avatarFile = acceptedFiles?.[0];
    //     if (avatarFile && id) updateMemberAvatar({ id: id, file: avatarFile });
    // }, []);

    const onDrop = (acceptedFiles: File[]) => {
        setUploadedFiles(acceptedFiles);
        const avatarFile = acceptedFiles?.[0];
        if (avatarFile && id) updateMemberAvatar({ id: id, file: avatarFile });
    };

    useEffect(() => {
        if (!updateAvatarLoading && updateAvatarSuccess) {
            setUploadedFiles([]);
            resetUpdateMemberAvatar();
            toast.success("Successfully updated account avatar");
        }
    }, [updateAvatarLoading, updateAvatarSuccess]);

    const divClassName = "flex items-center justify-between my-4 gap-x-3";

    return (
        <div className="bg-white h-full">
            <div className="flex justify-between h-1/2 mb-8">
                <div className="flex gap-x-3 items-center">
                    {/* <img src={avatar || MemberAvatar} className="w-28 h-28" /> */}
                    <MemberAvatarUpload
                        src={
                            uploadedFiles?.[0]
                                ? URL.createObjectURL(uploadedFiles?.[0])
                                : avatar || MemberAvatar
                        }
                        onDrop={onDrop}
                    />
                    <div className="flex flex-col ml-2">
                        <p className="text-secondary text-2xl font-bold mb-2">
                            {member?.attributes?.first_name}{" "}
                            {member?.attributes.last_name}
                        </p>
                        <div className="flex flex-row gap-x-3">
                            {member?.attributes?.performance_test_type && (
                                <CustomIcon
                                    icon={stringToCamelCase(
                                        member?.attributes
                                            ?.performance_test_type
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
                <div className="2xl:w-1/4 flex justify-end">
                    {isEdit ? (
                        <span
                            className="font-bold text-lg cursor-pointer select-none"
                            onClick={onEditClick}
                        >
                            Edit
                        </span>
                    ) : (
                        <Link
                            to={`${ROUTES.USER.member.parse(member?.id)}`}
                            className="font-bold text-sm cursor-pointer select-none"
                            target="_blank"
                        >
                            View Profile
                        </Link>
                    )}
                </div>
            </div>
            <hr />
            <div className="my-8">
                <div className={divClassName}>
                    <p className="text-grey-secondary">Health History</p>
                    <div className="flex flex-row-reverse flex-wrap-reverse items-center justify-start gap-x-1.5">
                        {member?.attributes?.has_heart_disease && (
                            <CustomIcon
                                icon="heartDisease"
                                className="w-7 h-7"
                            />
                        )}
                        {member?.attributes?.has_high_blood_pressure && (
                            <CustomIcon
                                icon="highBloodPressure"
                                className="w-7 h-7"
                            />
                        )}
                        {member?.attributes?.has_chest_pain && (
                            <CustomIcon icon="chestPain" className="w-7 h-7" />
                        )}
                        {member?.attributes?.has_respiratory_disease && (
                            <CustomIcon
                                icon="respiratory"
                                className="w-7 h-7"
                            />
                        )}
                        {member?.attributes?.has_diabetes && (
                            <CustomIcon icon="diabetes" className="w-7 h-7" />
                        )}
                        {member?.attributes?.has_surgeries && (
                            <CustomIcon icon="surgery" className="w-7 h-7" />
                        )}
                        {member?.attributes?.has_loose_balance_dizziness && (
                            <CustomIcon icon="dizziness" className="w-7 h-7" />
                        )}
                        {member?.attributes?.has_stroke && (
                            <CustomIcon icon="stroke" className="w-7 h-7" />
                        )}
                        {member?.attributes?.has_bone_joint_soft_tissue && (
                            <CustomIcon icon="boneIssue" className="w-7 h-7" />
                        )}
                        {member?.attributes?.has_mental_health_learning_dis && (
                            <CustomIcon
                                icon="mentalHealth"
                                className="w-7 h-7"
                            />
                        )}
                        {member?.attributes?.has_other_med_conditions && (
                            <CustomIcon
                                icon="medicalCondition"
                                className="w-7 h-7"
                            />
                        )}
                    </div>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Membership</p>
                    <div className="flex flex-row-reverse items-center justify-between gap-x-1.5">
                        {member?.attributes?.has_active_membership ? (
                            <CustomIcon icon="active" className="w-7 h-7" />
                        ) : (
                            <CustomIcon icon="inactive" className="w-7 h-7" />
                        )}
                        {member?.attributes?.is_membership_frozen && (
                            <CustomIcon icon="frozen" className="w-7 h-7" />
                        )}
                    </div>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Coaching</p>
                    <div className="flex flex-row-reverse items-center justify-between gap-x-1.5">
                        {member?.attributes?.has_active_coached_client ? (
                            <CustomIcon icon="activePT" className="w-7 h-7" />
                        ) : (
                            <CustomIcon icon="inactivePT" className="w-7 h-7" />
                        )}
                        {member?.attributes?.is_coached_client_frozen && (
                            <CustomIcon icon="frozen" className="w-7 h-7" />
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <div className="my-5">
                <div className={divClassName}>
                    <p className="text-grey-secondary">Email</p>
                    <p className="font-bold text-right truncate">
                        <a href={`mailto:${member?.attributes?.email_address}`}>
                            {member?.attributes?.email_address}
                        </a>
                    </p>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Cell Phone</p>
                    <p className="font-bold text-right">
                        {" "}
                        {member?.attributes?.cell_phone}
                    </p>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">DOB</p>
                    <p className="font-bold text-right">
                        {dateWithDot(member?.attributes?.birthday || "")}
                    </p>
                </div>
            </div>
            <hr />
            <div className="my-5">
                <div className={divClassName}>
                    <p className="text-grey-secondary">Coach</p>
                    <p className="font-bold text-right">
                        {member?.relationships?.user?.attributes?.first_name}{" "}
                        {member?.relationships?.user?.attributes?.last_name}
                    </p>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Membership</p>
                    <p className="font-bold text-right">
                        {member?.attributes?.recent_membership_agreement ? (
                            <>
                                {dateWithDot(
                                    member?.attributes
                                        ?.recent_membership_agreement
                                        ?.agreement_start || ""
                                )}{" "}
                                -{" "}
                                {dateWithDot(
                                    member?.attributes
                                        ?.recent_membership_agreement
                                        ?.agreement_end || ""
                                )}
                            </>
                        ) : (
                            "No record"
                        )}
                    </p>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Coaching</p>
                    <p className="font-bold text-right">
                        {member?.attributes?.recent_coached_client_agreement ? (
                            <>
                                {dateWithDot(
                                    member?.attributes
                                        ?.recent_coached_client_agreement
                                        ?.agreement_start || ""
                                )}{" "}
                                -{" "}
                                {dateWithDot(
                                    member?.attributes
                                        ?.recent_coached_client_agreement
                                        ?.agreement_end || ""
                                )}
                            </>
                        ) : (
                            "No record"
                        )}
                    </p>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Lead Source</p>
                    <p className="font-bold text-right">{leadSource}</p>
                </div>
                <div className={divClassName}>
                    <p className="text-grey-secondary">Location</p>
                    <p className="font-bold text-right">
                        {member?.relationships?.gym?.attributes?.name}
                    </p>
                </div>
            </div>
            <div className="p-2 flex justify-center items-stretch">
                <Button
                    variant="primary"
                    label="View Custom Fields"
                    className="flex-grow border-2 bg-white btn-md mr-4 !capitalize"
                    onClick={onViewClick}
                />
            </div>
        </div>
    );
};

export default ProfileCard;
