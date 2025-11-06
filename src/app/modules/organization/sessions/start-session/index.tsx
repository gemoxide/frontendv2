import { useState, useEffect } from "react";
import Section from "../../../../core/components/Section";
import Tabs from "../../../../core/components/Tabs";
import Overview from "./components/Overview";
import { mapDispatchToProps } from "../../../../core/state/reducer/sessions";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import Loader from "../../../../core/components/Loader";
import Button from "../../../../core/components/Button";
import { ROUTES } from "../../../../core/constants/routes";
import { ISession } from "../../../../core/interfaces/sessions.interface";

const StartGroupAssessment: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);

    const { getSession } = mapDispatchToProps();

    const { loading, success, data } = useSelector(
        (state: RootState) => state.sessions.getSession
    );

    const [sessionData, setSessionData] = useState<ISession | undefined>();

    const fetch = () => {
        if (id) {
            getSession(id);
        }
    };

    useEffect(() => {
        fetch();
    }, [id]);

    useEffect(() => {
        if (!loading && success) {
            setSessionData(data);
        }
    }, [loading, success]);

    return (
        <div className="shadow-lg rounded-md bg-white h-full p-8 mt-4 relative">
            <div className="flex flex-row justify-end">
                <Button
                    label="Close"
                    variant="secondary"
                    className="mb-9 !capitalize "
                    onClick={() => navigate(ROUTES.USER.sessions.key)}
                />
            </div>
            <Overview
                sessionId={sessionData?.id || 0}
                members={sessionData?.relationships.members || []}
                refreshMembers={fetch}
            />
        </div>
    );
};

export default StartGroupAssessment;
