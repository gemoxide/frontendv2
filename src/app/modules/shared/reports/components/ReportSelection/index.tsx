import { useState, useMemo } from "react";
import Input from "../../../../../core/components/Forms/Input";
import { IReport, REPORT_TYPES } from "../../../../../core/constants/reports";
import Accordion from "../../../../../core/components/Accordion";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";
import { mapDispatchToProps } from "../../../../../core/state/reducer/auth";

interface Props {
    setSelectedReport: (selectedReport?: IReport) => void;
}

const ReportSelection: React.FC<Props> = ({ setSelectedReport }) => {
    const { addFavoriteReport, removeFavoriteReport } = mapDispatchToProps();

    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    const [search, setSearch] = useState("");

    const favoriteReports = useMemo(() => {
        return REPORT_TYPES.flatMap((type) =>
            type.reports.filter((report) =>
                currentUser?.attributes.favorite_reports.includes(report.label)
            )
        ).map((report, i) => (
            <div className="flex justify-between" key={i}>
                <span
                    className="cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                >
                    {report.label}
                </span>
                <HeartIconSolid
                    className=" cursor-pointer w-5 h-5"
                    onClick={() =>
                        removeFavoriteReport({
                            report: report.label,
                        })
                    }
                />
            </div>
        ));
    }, [currentUser?.attributes.favorite_reports]);

    return (
        <div className="flex flex-col shadow-lg rounded-md bg-white w-1/4 p-6 gap-y-2">
            <h3 className="text-secondary cursor-pointer font-bold">
                Filter Reports
            </h3>
            <hr className="mb-4" />
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                isNotFormHook
                placeHolder={"Filter Reports"}
                variant="secondary"
                icon="search"
            />
            <Accordion
                title="Favorites"
                content={favoriteReports}
                contentContainerClass="flex flex-col gap-y-2"
            />
            {REPORT_TYPES.filter((type) =>
                type.reports.find((report) =>
                    report.label.toLowerCase().includes(search.toLowerCase())
                )
            ).map((type, i) => {
                const reports = type.reports
                    .filter((report) =>
                        report.label
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((report, i) => {
                        return (
                            <div className="flex justify-between" key={i}>
                                <span
                                    className="cursor-pointer"
                                    onClick={() => setSelectedReport(report)}
                                >
                                    {report.label}
                                </span>
                                {currentUser?.attributes.favorite_reports.includes(
                                    report.label
                                ) ? (
                                    <HeartIconSolid
                                        className=" cursor-pointer w-5 h-5"
                                        onClick={() =>
                                            removeFavoriteReport({
                                                report: report.label,
                                            })
                                        }
                                    />
                                ) : (
                                    <HeartIcon
                                        className=" cursor-pointer w-5 h-5"
                                        onClick={() =>
                                            addFavoriteReport({
                                                report: report.label,
                                            })
                                        }
                                    />
                                )}
                            </div>
                        );
                    });
                return (
                    <Accordion
                        title={type.type}
                        content={reports}
                        contentContainerClass="flex flex-col gap-y-2"
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default ReportSelection;
