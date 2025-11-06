import { useState, useEffect } from "react";
import Section from "../../../../core/components/Section";
import MembersTable from "./components/MembersTable";
import GroupAssessmentForm from "./components/GroupAssessmentForm";
import { useNavigate, useParams } from "react-router-dom";
import { mapDispatchToProps } from "../../../../core/state/reducer/group-assessments";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import {
    IGroupAssessment,
    IGroupAssessmentMember,
} from "../../../../core/interfaces/group-assessments.interface";
import { ROUTES } from "../../../../core/constants/routes";
import { toast } from "react-toastify";

const GroupAssessment: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedGroupAssessment, setSelectedGroupAssessment] =
        useState<IGroupAssessment>();
    const [selectedMembers, setSelectedMembers] = useState<
        IGroupAssessmentMember[]
    >([]);

    const [type, setType] = useState<"Standard" | "Optimal Life">("Standard");

    const { getGroupAssessment, startGroupAssessment } = mapDispatchToProps();

    const { loading, success, data } = useSelector(
        (state: RootState) => state.groupAssessments.getGroupAssessment
    );

    const { loading: startLoading, success: startSuccess } = useSelector(
        (state: RootState) => state.groupAssessments.startGroupAssessment
    );

    useEffect(() => {
        if (id) {
            getGroupAssessment(id);
        }
    }, [id]);

    useEffect(() => {
        if (!loading && success && id) {
            setSelectedGroupAssessment(data);
            setSelectedMembers(data?.relationships.members || []);
        } else {
            setSelectedGroupAssessment(undefined);
            clearMembers();
        }
    }, [loading, success, id]);

    const removeMember = (id: string) => {
        setSelectedMembers(
            selectedMembers.filter((member) => member.id !== id)
        );
    };

    const clearMembers = () => {
        setSelectedMembers([]);
    };

    const startAssessment = (id: number) => {
        startGroupAssessment({ id: id });
        navigate(ROUTES.USER.groupAssessmentStart.parse(id.toString()));
    };

    const onChangeType = (type: "Standard" | "Optimal Life") => {
        setType(type);
    };

    return (
        <Section
            title="Assessment"
            {...(id
                ? {
                      rightButtonLabel: "Start",
                      rightButtonOnclick: () => {
                          startAssessment(selectedGroupAssessment?.id || 0);
                      },
                  }
                : {})}
        >
            <div className="w-full rounded-lg mt-4 flex gap-x-6">
                <MembersTable
                    selectedMembers={selectedMembers}
                    setSelectedMembers={setSelectedMembers}
                    onChangeType={onChangeType}
                />
                <GroupAssessmentForm
                    selectedGroupAssessment={selectedGroupAssessment}
                    selectedMembers={selectedMembers}
                    removeMember={removeMember}
                    clearMembers={clearMembers}
                    type={type}
                />
            </div>
        </Section>
    );
};

export default GroupAssessment;
