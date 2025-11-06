import { useState, useEffect } from "react";
import Tabs from "../../../../core/components/Tabs";
import Overview from "./components/Overview";
import { mapDispatchToProps } from "../../../../core/state/reducer/group-assessments";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import Loader from "../../../../core/components/Loader";
import FunctionalMovement from "./components/FunctionalMovement";
import Performance from "./components/Performance";
import Button from "../../../../core/components/Button";
import { ROUTES } from "../../../../core/constants/routes";
import { IGroupAssessment } from "../../../../core/interfaces/group-assessments.interface";
import { member } from "../../../../core/services/routes/user-routes";

const StartGroupAssessment: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tab, setTab] = useState(0);
    const [groupAssessment, setGroupAssessment] = useState<
        IGroupAssessment | undefined
    >();
    const [previousId, setPreviousId] = useState("");

    const { getGroupAssessment } = mapDispatchToProps();

    const {
        loading: groupAssessmentLoading,
        success: groupAssessmentSuccess,
        data: groupAssessmentData,
    } = useSelector(
        (state: RootState) => state.groupAssessments.getGroupAssessment
    );

    const {
        loading: updateMemberAssessmentLoading,
        success: updateMemberAssessmentSuccess,
        data: updateMemberAssessmentData,
    } = useSelector((state: RootState) => state.groupAssessments.updateMemberAssessment);

    const fetch = () => {
        if (id) {
            getGroupAssessment(id);
        }
    };

    useEffect(() => {
        if (id) {
            fetch();
        }
    }, [id]);

    useEffect(() => {
        if (!groupAssessmentLoading && groupAssessmentData) {
            setGroupAssessment(groupAssessmentData);
        }
    }, [groupAssessmentLoading, groupAssessmentSuccess]);

    useEffect(() => {
        if (!updateMemberAssessmentLoading && updateMemberAssessmentSuccess) {
            setGroupAssessment(updateMemberAssessmentData);
        }
    }, [updateMemberAssessmentSuccess, id]);

    const tabs = [
        {
            name: "Overview",
            component: (
                <Overview
                    groupAssessmentId={groupAssessment?.id || 0}
                    groupAssessmentMode={
                        groupAssessment?.attributes.mode || "Standard"
                    }
                    members={groupAssessment?.relationships.members || []}
                />
            ),
        },
        {
            name: "FMS and Body Metrics",
            component: (
                <FunctionalMovement
                    groupAssessmentId={groupAssessment?.id || 0}
                    groupAssessmentMode={
                        groupAssessment?.attributes.mode || "Standard"
                    }
                    members={groupAssessment?.relationships.members || []}
                />
            ),
        },
        {
            name: "Performance",
            component: (
                <Performance
                    groupAssessmentId={groupAssessment?.id || 0}
                    groupAssessmentMode={
                        groupAssessment?.attributes.mode || "Standard"
                    }
                    members={groupAssessment?.relationships.members || []}
                />
            ),
        },
    ];

    return (
        <div className="shadow-lg rounded-md bg-white h-full p-8 mt-4 relative">
            {/* {groupAssessmentLoading ? (
                <Loader />
            ) : (
                <> */}
            <Tabs
                hasNoShadow
                orientation="vertical"
                tabs={tabs}
                current={tab || 0}
                onChangeTab={(key) => setTab(key)}
            />
            <Button
                label="Exit"
                variant="secondary"
                className="absolute top-10 right-10"
                onClick={() => navigate(ROUTES.USER.groupAssessments.key)}
            />
            {/* </>
            )} */}
        </div>
    );
};

export default StartGroupAssessment;
