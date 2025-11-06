import { useState, useEffect } from "react";
import Section from "../../../../core/components/Section";
import MembersTable from "./components/MembersTable";
import SessionForm from "./components/SessionForm";
import { useNavigate, useParams } from "react-router-dom";
import { mapDispatchToProps } from "../../../../core/state/reducer/sessions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import {
    ISession,
    ISessionMember,
} from "../../../../core/interfaces/sessions.interface";
import { ROUTES } from "../../../../core/constants/routes";

const Session: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedSession, setSelectedSession] = useState<ISession>();
    const [selectedMembers, setSelectedMembers] = useState<ISessionMember[]>(
        []
    );

    const { getSession } = mapDispatchToProps();

    const { loading, success, data } = useSelector(
        (state: RootState) => state.sessions.getSession
    );

    useEffect(() => {
        if (id) {
            getSession(id);
        }
    }, [id]);

    useEffect(() => {
        if (!loading && success && id) {
            setSelectedSession(data);
            setSelectedMembers(data?.relationships.members || []);
        } else {
            setSelectedSession(undefined);
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

    return (
        <Section
            title="Session"
            {...(id
                ? {
                      rightButtonLabel: "Start",
                      rightButtonOnclick: () =>
                          navigate(ROUTES.USER.sessionStart.parse(id)),
                  }
                : {})}
        >
            <div className="w-full rounded-lg mt-4 flex gap-x-6">
                <MembersTable
                    selectedMembers={selectedMembers}
                    setSelectedMembers={setSelectedMembers}
                />
                <SessionForm
                    selectedSession={selectedSession}
                    selectedMembers={selectedMembers}
                    removeMember={removeMember}
                    clearMembers={clearMembers}
                />
            </div>
        </Section>
    );
};

export default Session;
