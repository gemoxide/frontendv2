import { useEffect, useState } from "react";

import CustomDataTable from "../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { IGroupAssessment } from "../../../../core/interfaces/group-assessments.interface";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../core/state/reducer/group-assessments";
import { formatDateUseBrowserTZ } from "../../../../core/services/utils/utils.service";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "../../../../core/constants/routes";

const Assessments: React.FC = () => {
    const { id } = useParams();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const { getMemberGroupAssessments } = mapDispatchToProps();

    const { data, loading } = useSelector(
        (state: RootState) => state.groupAssessments.getMemberGroupAssessments
    );

    const fetch = async () => {
        if (id) {
            getMemberGroupAssessments({
                member_id: id,
                page,
                per_page: perPage,
            });
        }
    };

    useEffect(() => {
        const getMemberGroupAssessmentsDebounce = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getMemberGroupAssessmentsDebounce);
    }, [page, perPage]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage: number, page: number) => {
        setPerPage(newPerPage);
        setPage(page);
    };

    const columns: TableColumn<IGroupAssessment>[] = [
        {
            name: "Date",
            cell: (groupAssessment) =>
                groupAssessment
                    ? formatDateUseBrowserTZ(
                          groupAssessment?.attributes?.assessment_at,
                          "date_time"
                      )
                    : "",
        },
        {
            name: "Coach",
            cell: (groupAssessment) =>
                `${groupAssessment?.relationships?.user?.attributes?.first_name} ${groupAssessment?.relationships?.user?.attributes?.last_name}`,
        },
        {
            name: "Type",
            cell: (groupAssessment) => groupAssessment?.attributes?.type,
        },
        {
            name: "Action",
            cell: (groupAssessment) => (
                <Link
                    to={ROUTES.USER.groupAssessmentStart.parse(
                        groupAssessment?.id?.toString()
                    )}
                    target="_blank"
                >
                    <EyeIcon className="h-6 w-6 text-blue-500" />
                </Link>
            ),
            right: true,
        },
    ];

    return (
        <div className="rounded-xl w-full bg-white shadow-lg py-4 px-2 mt-4">
            <CustomDataTable
                columns={columns}
                data={data?.data || []}
                loading={loading}
                pagination
                paginationServer
                sortServer
            />
        </div>
    );
};

export default Assessments;
