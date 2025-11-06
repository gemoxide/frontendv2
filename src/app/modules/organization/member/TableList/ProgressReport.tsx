import { useMemo, useEffect, useRef } from "react";
import CustomDataTable from "../../../../core/components/DataTable";
import { TableColumn } from "react-data-table-component";
import { useParams } from "react-router-dom";
import { mapDispatchToProps } from "../../../../core/state/reducer/group-assessments";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
import {
    IProgressReport,
    ProgressReportTableData,
} from "../../../../core/interfaces/group-assessments.interface";
import { formatDateUseBrowserTZ } from "../../../../core/services/utils/utils.service";
import ProgressReportChart from "./ProgressReportChart";
import Button from "../../../../core/components/Button";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";

const ProgressReport = () => {
    const { id } = useParams();

    const { getMemberProgressReport } = mapDispatchToProps();

    const { data: memberData } = useSelector(
        (state: RootState) => state.members.getMember
    );
    const { data, loading } = useSelector(
        (state: RootState) => state.groupAssessments.getMemberProgressReport
    );

    const reportTemplateRef = useRef<HTMLDivElement>(null);

    const handleGeneratePdf = async () => {
        const element = reportTemplateRef.current;
        if (element) {
            const img = await domtoimage.toPng(element);
            const pdf = new jsPDF();
            const imgProperties = pdf.getImageProperties(img);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight =
                (imgProperties.height * pdfWidth) / imgProperties.width;
            pdf.addImage(img, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
            pdf.save(
                `${memberData?.attributes.first_name} ${memberData?.attributes.last_name} - Progress Report.pdf`
            );
        }
    };

    const fetch = async () => {
        if (id) {
            getMemberProgressReport(id);
        }
    };

    useEffect(() => {
        const getMemberProgressReportDebounce = setTimeout(() => {
            fetch();
        }, 500);
        return () => clearTimeout(getMemberProgressReportDebounce);
    }, [id]);

    const performanceTestData: ProgressReportTableData[] | undefined =
        useMemo(() => {
            if (data?.firstAssessmentDate) {
                const performanceTest = data?.data.find(
                    (val) => val.measurement === "Perform Test"
                );
                return [
                    {
                        name: formatDateUseBrowserTZ(
                            data?.firstAssessmentDate,
                            "date"
                        ),
                        value: performanceTest?.start || 0,
                    },
                    {
                        name: "Prev 8 Wk",
                        value: performanceTest?.prev || 0,
                    },
                    {
                        name: "Current 8 Wk",
                        value: performanceTest?.current || 0,
                    },
                ];
            }
        }, [data]);

    const functionalMovementTestData: ProgressReportTableData[] | undefined =
        useMemo(() => {
            if (data?.firstAssessmentDate) {
                const functionalMovementTest = data?.data.find(
                    (val) => val.measurement === "FMS"
                );
                return [
                    {
                        name: formatDateUseBrowserTZ(
                            data?.firstAssessmentDate,
                            "date"
                        ),
                        value: functionalMovementTest?.start || 0,
                    },
                    {
                        name: "Prev 8 Wk",
                        value: functionalMovementTest?.prev || 0,
                    },
                    {
                        name: "Current 8 Wk",
                        value: functionalMovementTest?.current || 0,
                    },
                ];
            }
        }, [data]);

    const columns: TableColumn<IProgressReport>[] = [
        {
            name: "Measurement",
            cell: (progressReport) => progressReport.measurement,
        },
        {
            name: "Start",
            cell: (progressReport) => progressReport.start,
            right: true,
        },
        {
            name: "Prev",
            cell: (progressReport) => progressReport.prev,
            right: true,
        },
        {
            name: "Current",
            cell: (progressReport) => progressReport.current,
            right: true,
        },
        {
            name: "8 Wk Change",
            cell: (progressReport) => {
                const change = progressReport.current - progressReport.prev;
                return change.toFixed(1);
            },
            right: true,
        },
        {
            name: "Total Change",
            cell: (progressReport) => {
                const change = progressReport.current - progressReport.start;
                return change.toFixed(1);
            },
            right: true,
        },
    ];

    return (
        <div className="rounded-xl w-full bg-white shadow-lg py-4 px-2 mt-4">
            <Button
                label="Download Report"
                className="mb-4"
                onClick={handleGeneratePdf}
            />
            <div ref={reportTemplateRef} className="export">
                <CustomDataTable
                    columns={columns}
                    data={data?.data || []}
                    loading={loading}
                />
                <div className="flex gap-x-2">
                    <div className="w-1/2">
                        <ProgressReportChart
                            title="Performance Test"
                            ticks={[
                                0, 50, 100, 150, 200, 250, 300, 350, 400, 450,
                                500,
                            ]}
                            domain={[0, 400]}
                            data={performanceTestData}
                        />
                    </div>
                    <div className="w-1/2">
                        <ProgressReportChart
                            title="Functional Movement Test"
                            ticks={[0, 2, 4, 6, 8, 10]}
                            domain={[0, 10]}
                            data={functionalMovementTestData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressReport;
