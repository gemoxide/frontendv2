import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    formatDateTime,
    formatDateUseBrowserTZ,
} from "../../../core/services/utils/utils.service";
import { RootState } from "../../../core/state/reducer";
import { TableColumn } from "react-data-table-component";
import { IGroupAssessment } from "../../../core/interfaces/group-assessments.interface";
import { PermissionType } from "../../../core/interfaces/routes.interface";
import Section from "../../../core/components/Section";
import CustomDataTable from "../../../core/components/DataTable";
import KebabDropdown from "../../../core/components/KebabDropdown";
import GroupAssessmentFilters from "./components/Filters/GroupAssessmentFilters";
import { mapDispatchToProps } from "../../../core/state/reducer/group-assessments";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../core/state/reducer/users";
import { mapDispatchToProps as mapDispatchToAssessmentsProps } from "../../../core/state/reducer/assessments";
import { ROUTES } from "../../../core/constants/routes";
import { TrashIcon } from "@heroicons/react/24/outline";
import { confirmDelete } from "../../../core/helpers/prompt";
import { toast } from "react-toastify";

const GroupAssessments: React.FC = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const navigate = useNavigate();
    const { getGroupAssessments, deleteGroupAssessment, startGroupAssessment } =
        mapDispatchToProps();
    const { data, loading } = useSelector(
        (state: RootState) => state.groupAssessments.getGroupAssessments
    );

    const {
        loading: deleteGroupAssessmentLoading,
        success: deleteGroupAssessmentSuccess,
    } = useSelector(
        (state: RootState) => state.groupAssessments.deleteGroupAssessment
    );
    const [mode, setMode] = useState("");
    const [type, setType] = useState("");
    const [userId, setUserId] = useState("");
    const [assessmentDate, setAssessmentDate] = useState("");
    const currentDate = new Date().toLocaleDateString();

    const {
        data: currentUser,
        success: currentUserSuccess,
        loading: currentUserLoading,
    } = useSelector((state: RootState) => state.auth.user);

    const { loading: startLoading, success: startSuccess } = useSelector(
        (state: RootState) => state.groupAssessments.startGroupAssessment
    );

    const fetch = async (filters: any) => {
        getGroupAssessments(filters);
    };

    useEffect(() => {
        const filters: any = {
            page,
            per_page: perPage,
        };

        if (type) {
            filters.assessment_type_id = type;
        }

        if (mode) {
            filters.assessment_mode_id = mode;
        }

        if (userId) {
            filters.user_id = userId;
        }

        if (assessmentDate) {
            filters.date_from = assessmentDate;
            filters.date_to = assessmentDate;
        }

        const getGroupAssessmentsDebounce = setTimeout(() => {
            fetch(filters);
        }, 500);
        return () => clearTimeout(getGroupAssessmentsDebounce);
    }, [
        page,
        perPage,
        mode,
        type,
        assessmentDate,
        userId,
        deleteGroupAssessmentSuccess,
    ]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const hasCreateGroupAssessment = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GROUP_ASSESSMENT_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateGroupAssessment = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GROUP_ASSESSMENT_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasDeleteGroupAssessment = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name ===
                    PermissionType.GROUP_ASSESSMENT_DELETE
            );
        }
        return false;
    }, [currentUser]);

    const columns: TableColumn<IGroupAssessment>[] = [
        {
            name: "Date",
            cell: (groupAssessment) =>
                groupAssessment
                    ? formatDateTime(groupAssessment?.attributes?.assessment_at)
                    : "",
        },
        {
            name: "Coach",
            cell: (groupAssessment) =>
                `${groupAssessment?.relationships?.user?.attributes?.first_name} ${groupAssessment?.relationships?.user?.attributes?.last_name}`,
        },
        {
            name: "Members",
            cell: (groupAssessment) =>
                groupAssessment?.attributes?.members_count,
        },
        {
            name: "Type",
            cell: (groupAssessment) => groupAssessment?.attributes?.type,
        },
        {
            name: "",
            cell: (groupAssessment) => (
                <div className="w-full flex justify-end items-center gap-x-8">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            ...(hasUpdateGroupAssessment
                                ? [
                                      {
                                          label: "Edit",
                                          action: () => {
                                              navigate(
                                                  ROUTES.USER.groupAssessmentEdit.parse(
                                                      groupAssessment.id.toString()
                                                  )
                                              );
                                          },
                                      },
                                  ]
                                : []),
                            {
                                label: "Start",
                                action: () => {
                                    startGroupAssessment({
                                        id: groupAssessment.id,
                                    });
                                    navigate(
                                        ROUTES.USER.groupAssessmentStart.parse(
                                            groupAssessment.id.toString()
                                        )
                                    );
                                },
                            },
                        ]}
                    />
                    {hasDeleteGroupAssessment && (
                        <span
                            role="button"
                            title="Delete Group Assessment"
                            onClick={async () => {
                                const { isConfirmed } = await confirmDelete(
                                    "Group Assessment"
                                );
                                if (isConfirmed) {
                                    deleteGroupAssessment({
                                        id: groupAssessment?.id,
                                    });
                                }
                            }}
                        >
                            <TrashIcon className="w-5 h-5 text-red-500" />
                        </span>
                    )}
                </div>
            ),
        },
    ];

    const { getGymUsers } = mapDispatchToUserProps();

    const { getAssessments } = mapDispatchToAssessmentsProps();

    const {
        loading: getAssessmentsLoading,
        success: getAssessmentsSuccess,
        data: getAssessmentsData,
    } = useSelector((state: RootState) => state.assessments.getAssessments);

    const {
        data: gymUsers,
        loading: gymUsersLoading,
        success: gymUsersSuccess,
    } = useSelector((state: RootState) => state.users.getGymUsers);

    useEffect(() => {
        getAssessments();
    }, []);

    useEffect(() => {
        if (
            !currentUserLoading &&
            currentUserSuccess &&
            currentUser?.relationships.user_gyms?.length
        ) {
            getGymUsers({
                gym_id: currentUser?.relationships?.user_gyms[0].id,
            });
        }
    }, [currentUserLoading, currentUserSuccess]);

    const assessmentModeOptions = useMemo(() => {
        return getAssessmentsData?.attributes?.modes.map((mode) => ({
            label: mode.name,
            value: mode.id,
        }));
    }, [getAssessmentsData]);

    const assessmentTypeOptions = useMemo(() => {
        return getAssessmentsData?.attributes.types.map((type) => ({
            label: type.name,
            value: type.id,
        }));
    }, [getAssessmentsData]);

    const coachOptions = useMemo(() => {
        return gymUsers?.data.map((user) => ({
            label: `${user?.attributes.first_name} ${user?.attributes.last_name}`,
            value: user.id,
        }));
    }, [gymUsers]);

    return (
        <Section
            title="Assessments"
            {...(hasCreateGroupAssessment
                ? {
                      rightButtonLabel: "Create Assessment",
                      rightButtonOnclick: () =>
                          navigate(ROUTES.USER.groupAssessmentNew.key),
                  }
                : {})}
        >
            <GroupAssessmentFilters
                assessmentDate={assessmentDate}
                setAssessmentDate={setAssessmentDate}
                mode={mode}
                type={type}
                userId={userId}
                setMode={setMode}
                setType={setType}
                setUserId={setUserId}
                getAssessmentsLoading={getAssessmentsLoading}
                gymUsersLoading={gymUsersLoading}
                coachOptions={coachOptions}
                assessmentTypeOptions={assessmentTypeOptions}
                assessmentModeOptions={assessmentModeOptions}
            />
            <div className="w-full bg-white rounded-lg p-8 shadow-lg mt-4">
                <div className="mt-8">
                    <CustomDataTable
                        loading={loading}
                        columns={columns}
                        data={data?.data || []}
                        pagination
                        paginationServer
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                        paginationTotalRows={data?.meta?.total}
                        sortServer
                        isHideRowPerPage
                    />
                </div>
            </div>
        </Section>
    );
};

export default GroupAssessments;
