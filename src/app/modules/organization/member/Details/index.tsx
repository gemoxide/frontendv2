import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import ProfileCard from "./components/ProfileCard";
import Notes from "./Notes/Notes";
import Files from "./FileManager/Files";
import { useEffect, useState } from "react";
import Modal from "../../../../core/components/Modal";
import CreateMemberForm from "../../members/CreateMemberForm";
import CreateMemberLeadForm from "../../members/CreateMemberLeadForm";
import CustomFields from "./components/CustomFields";
import { mapDispatchToProps } from "../../../../core/state/reducer/form-contact-fields";
import { snakeCaseToTitleCase } from "../../../../core/services/utils/utils.service";

const Details = () => {
    const [customFields, setCustomFields] = useState<any[]>([]);
    const { getFormContactFields } = mapDispatchToProps();

    const { data: getMemberData } = useSelector(
        (state: RootState) => state.members.getMember
    );

    const { data: getFormContactFieldsData } = useSelector(
        (state: RootState) => state.formContactFields.getFormContactFields
    );

    useEffect(() => {
        getFormContactFields();
    }, []);

    useEffect(() => {
        if (getFormContactFieldsData && getMemberData) {
            const customFields: Record<string, any> =
                getMemberData?.attributes?.custom_fields;

            const customFieldsArray = [];

            for (const fieldName in customFields) {
                if (customFields.hasOwnProperty(fieldName)) {
                    const customField = getFormContactFieldsData.data.find(
                        (formField) =>
                            formField.attributes.field_name === fieldName
                    );
                    if (customField) {
                        customFieldsArray.push({
                            name: customField.attributes.label,
                            value: customFields[fieldName],
                        });
                    } else {
                        customFieldsArray.push({
                            name: snakeCaseToTitleCase(fieldName),
                            value: customFields[fieldName],
                        });
                    }
                }
            }
            setCustomFields(customFieldsArray);
        }
    }, [getFormContactFieldsData, getMemberData]);

    const { loading: updateMemberLoading, success: updateMemberSuccess } =
        useSelector((state: RootState) => state.members.updateMember);

    const {
        loading: updateMemberLeadLoading,
        success: updateMemberLeadSuccess,
    } = useSelector((state: RootState) => state.members.updateMemberLead);

    const [isOpenCreateMemberModal, setIsOpenCreateMemberModal] =
        useState(false);

    const [isOpenCustomFieldModal, setIsOpenCustomFieldModal] =
        useState<boolean>(false);

    const onEditClick = () => {
        setIsOpenCreateMemberModal(true);
    };

    const onViewClick = () => {
        setIsOpenCustomFieldModal(true);
    };

    useEffect(() => {
        if (!updateMemberLoading && updateMemberSuccess) {
            setIsOpenCreateMemberModal(false);
        }
    }, [updateMemberLoading, updateMemberSuccess]);

    useEffect(() => {
        if (!updateMemberLeadLoading && updateMemberLeadSuccess) {
            setIsOpenCreateMemberModal(false);
        }
    }, [updateMemberLeadLoading, updateMemberLeadSuccess]);

    return (
        <>
            <Modal
                isOpen={isOpenCreateMemberModal}
                onClose={() => setIsOpenCreateMemberModal(false)}
            >
                {getMemberData?.attributes.member_since ? (
                    <CreateMemberForm selectedMember={getMemberData} />
                ) : (
                    <CreateMemberLeadForm selectedMember={getMemberData} />
                )}
            </Modal>
            <Modal
                isOpen={isOpenCustomFieldModal}
                onClose={() => setIsOpenCustomFieldModal(false)}
            >
                <CustomFields content={customFields} />
            </Modal>
            <div className="bg-white shadow-md rounded-md p-6">
                <ProfileCard
                    id={getMemberData?.id}
                    leadSource={
                        getMemberData?.attributes?.lead_source_formatted || ""
                    }
                    onEditClick={onEditClick}
                    avatar={getMemberData?.attributes.avatar}
                    member={getMemberData}
                    onViewClick={onViewClick}
                />
            </div>
            <Notes />
            <Files />
        </>
    );
};

export default Details;
