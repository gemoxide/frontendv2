import { useState, useEffect, useMemo } from "react";
import { RootState } from "../../../core/state/reducer";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../core/state/reducer/sessions";
import { mapDispatchToProps as mapDispatchToUserProps } from "../../../core/state/reducer/users";
import { TableColumn } from "react-data-table-component";
import { ISession } from "../../../core/interfaces/sessions.interface";
import { customFormatDateUseBrowserTZ } from "../../../core/services/utils/utils.service";
import Section from "../../../core/components/Section";
import CustomDataTable from "../../../core/components/DataTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../core/constants/routes";
import KebabDropdown from "../../../core/components/KebabDropdown";
import Filters from "./Filters/Filter";
import { PermissionType } from "../../../core/interfaces/routes.interface";

interface CoachOptions {
    label: string;
    value: number;
}

const Sessions: React.FC = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [userOptions, setUserOptions] = useState<CoachOptions[]>([]);
    const [coach, setCoach] = useState<string | undefined>(undefined);
    const [dates, setDates] = useState<string>("upcoming");
    const navigate = useNavigate();

    const { getSessions } = mapDispatchToProps();
    const { getGymUsers } = mapDispatchToUserProps();

    const { data, loading } = useSelector(
        (state: RootState) => state.sessions.getSessions
    );

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const {
        data: gymUserData,
        loading: gymUserLoading,
        success: gymUserSuccess,
    } = useSelector((state: RootState) => state.users.getGymUsers);

    const fetch = async () => {
        getSessions({
            page,
            per_page: perPage,
            user_id: coach,
            sessions: dates,
            current_date: new Date().toLocaleDateString(),
        });
    };

    useEffect(() => {
        const getSessionsDebounce = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getSessionsDebounce);
    }, [page, perPage, coach, dates]);

    const fetchGymUsers = async () => {
        const gymId = currentUser?.relationships?.user_gyms
            ? currentUser?.relationships?.user_gyms[0]?.id
            : undefined;
        getGymUsers({
            gym_id: gymId,
            per_page: 200,
            order_by: "name",
            direction: "asc",
        });
    };

    useEffect(() => {
        fetchGymUsers();
    }, []);

    useEffect(() => {
        if (!gymUserLoading && gymUserSuccess) {
            setUserOptions([
                ...(gymUserData?.data.map((user) => ({
                    label: `${user.attributes.first_name} ${user.attributes.last_name}`,
                    value: user.id,
                })) || []),
            ]);
        }
    }, [gymUserLoading, gymUserSuccess]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const hasCreateSession = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.SESSION_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const hasUpdateSession = useMemo(() => {
        if (currentUser?.relationships?.roles?.length) {
            return currentUser?.relationships?.roles[0]?.relationships.permissions?.some(
                (permission) =>
                    permission.attributes.name === PermissionType.SESSION_CREATE
            );
        }
        return false;
    }, [currentUser]);

    const columns: TableColumn<ISession>[] = [
        {
            name: "Date",
            cell: (session) =>
                session
                    ? customFormatDateUseBrowserTZ(
                          session?.attributes?.session_at,
                          "date_time"
                      )
                    : "",
        },
        {
            name: "Coach",
            cell: (session) =>
                `${session?.relationships?.user?.attributes?.first_name} ${session?.relationships?.user?.attributes?.last_name}`,
        },
        {
            name: "Members",
            cell: (session) => session?.attributes?.members_count,
        },
        {
            name: "",
            cell: (session) => (
                <div className="w-full flex justify-end">
                    <KebabDropdown
                        placement="top"
                        lists={[
                            ...(hasUpdateSession
                                ? [
                                      {
                                          label: "Edit",
                                          action: () => {
                                              navigate(
                                                  ROUTES.USER.sessionEdit.parse(
                                                      session.id.toString()
                                                  )
                                              );
                                          },
                                      },
                                  ]
                                : []),
                            {
                                label: "Start",
                                action: () => {
                                    navigate(
                                        ROUTES.USER.sessionStart.parse(
                                            session.id.toString()
                                        )
                                    );
                                },
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];
    return (
        <Section
            title="Sessions"
            {...(hasCreateSession
                ? {
                      rightButtonLabel: "Create Session",
                      rightButtonOnclick: () =>
                          navigate(ROUTES.USER.sessionNew.key),
                  }
                : {})}
        >
            <Filters
                coachOptions={userOptions}
                coach={coach}
                dates={dates}
                setCoach={setCoach}
                setDates={setDates}
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

export default Sessions;
