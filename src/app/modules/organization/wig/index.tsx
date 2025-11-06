import React, { useEffect, useState } from "react";
import Button from "../../../core/components/Button";
import Header from "./components/Header";
import Schedule from "./components/Schedule";
import WigSection from "./components/WigSection";
import Modal from "../../../core/components/Modal";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import { RootState } from "../../../core/state/reducer";
import { useSelector } from "react-redux";
import { mapDispatchToProps } from "../../../core/state/reducer/gyms";
import { mapDispatchToProps as mapDispatchToPropsGymRevenue } from "../../../core/state/reducer/gym-revenue";
import { toast } from "react-toastify";
import { updateWigRequest } from "../../../core/services/gyms/gyms.service";
import { createGymRevenueRequest } from "../../../core/services/gym-revenue/gym-revenue.service";
import {
    IGapAnalysis,
    IGymMonthlyWigTableProperties,
} from "../../../core/interfaces/gym-revenue.interface";
import WigScheduleForm from "./components/WigScheduleForm";
import GapAnalysis from "./components/GapAnalysis";
import { LeadMeasures } from "./components/LeadMeasures";
import { IGym } from "../../../core/interfaces/gyms.interface";

const Wig: React.FC = () => {
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );
    const { data: getGymData } = useSelector(
        (state: RootState) => state.gyms.getGym
    );
    const { data: getGymMonthRevenueData } = useSelector(
        (state: RootState) => state.gymRevenue.getGymMonthRevenue
    );
    const { data: getGymMonthlyWigData } = useSelector(
        (state: RootState) => state.gymRevenue.getGymMonthlyWig
    );
    const {
        data: getGymMonthlyWigTableData,
        loading: getGymMonthlyWigTableLoading,
    } = useSelector(
        (state: RootState) => state.gymRevenue.getGymMonthlyWigTable
    );
    const { data: getGapAnalysisData, loading: getGapAnalysisLoading } =
        useSelector((state: RootState) => state.gymRevenue.getGapAnalysis);
    const { getGym } = mapDispatchToProps();
    const {
        getGymMonthRevenue,
        getGymMonthlyWig,
        getGymMonthlyWigTable,
        getGapAnalysis,
    } = mapDispatchToPropsGymRevenue();

    const [isOpenWigModal, setIsOpenWigModal] = useState<boolean>(false);
    const [isOpenMonthlyRevenueModal, setIsOpenMonthlyRevenueModal] =
        useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [currentMonth, setCurrentMonth] = useState<any>(null);
    const [selectedMonth, setSelectedMonth] = useState<any>(null);

    const fetchGymData = async () => {
        if (currentUser?.relationships.user_gyms?.length)
            getGym(currentUser?.relationships.user_gyms[0].id || "");
    };

    const fetchGymMonthlyWig = async () => {
        if (getGymData) {
            getGymMonthlyWig(getGymData?.id);
        }
    };

    const fetchGapAnalysis = async () => {
        if (getGymData) {
            getGapAnalysis(getGymData?.id);
        }
    };

    const handleNext = async (payload: any) => {
        if (!getGymData) return;

        try {
            const id = getGymData?.id;
            const newPayload = {
                ...payload,
                id,
            };
            setCurrentMonth(payload.wig_start_date);
            const { data } = await updateWigRequest(newPayload);
            if (data) {
                setCurrentStep(2);
            }
        } catch (err) {
            toast.error("Error updating WIG");
        }
    };

    const fetchGymMonthRevenue = async () => {
        const previousMonth = new Date(`${currentMonth || ""}-01T00:00:00Z`);
        previousMonth.setUTCMonth(previousMonth.getUTCMonth() - 1);
        const formattedMonth = previousMonth.toISOString().split("T")[0];
        const month = formattedMonth.split("-")[1];
        const year = formattedMonth.split("-")[0];
        if (getGymData) {
            getGymMonthRevenue({
                gym_id: getGymData?.id,
                month_year: `${year}-${month}`,
            });
        }
    };

    const fetchWigMonthlyTable = async () => {
        if (getGymData) {
            getGymMonthlyWigTable(getGymData?.id);
        }
    };

    const handleSavePreviousMonth = async (payload: any) => {
        try {
            const previousMonth = new Date(
                `${currentMonth || ""}-01T00:00:00Z`
            );
            previousMonth.setUTCMonth(previousMonth.getUTCMonth() - 1);
            const formattedMonth = previousMonth.toISOString().split("T")[0];
            const month = formattedMonth.split("-")[1];
            const year = formattedMonth.split("-")[0];

            const membership_count = Number(
                (payload.membership_count?.toString() || "").replace(/,/g, "")
            );
            const pt_count = Number(
                (payload.pt_count?.toString() || "").replace(/,/g, "")
            );

            const newPayload = {
                ...payload,
                gym_id: getGymData?.id,
                month_year: `${year}-${month}`,
                membership_count,
                pt_count,
            };
            const { data } = await createGymRevenueRequest(newPayload);
            if (data) {
                // fetchGymData();
                // fetchGymMonthlyWig();
                setCurrentStep(3);
                // setIsOpenWigModal(false);
            }
        } catch (err) {
            toast.error("Error generating WIG dashboard");
        }
    };

    const handleSelectedMonth = (payload: any) => {
        setSelectedMonth(payload);
        setIsOpenMonthlyRevenueModal(true);
    };

    useEffect(() => {
        if (currentUser?.relationships.user_gyms?.length) {
            getGym(currentUser?.relationships.user_gyms[0].id || "");
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentMonth) fetchGymMonthRevenue();
    }, [currentMonth]);

    useEffect(() => {
        if (getGymData) {
            if (!getGymData?.attributes?.wig_start_date) {
                setIsOpenWigModal(true);
            } else {
                fetchWigMonthlyTable();
                fetchGymMonthlyWig();
                fetchGapAnalysis();
            }
        }
    }, [getGymData]);

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-white p-4 rounded-md shadow-lg w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-extrabold text-secondary">
                        WIG Dashboard
                    </h1>
                    <div className="flex">
                        <Button
                            label="Launch Setup Wizard"
                            className="capitalize"
                            onClick={() => setIsOpenWigModal(true)}
                        />
                    </div>
                </div>
                <Header gymData={getGymData} refetchGym={fetchGymData} />
            </div>
            <Schedule
                wigData={getGymMonthlyWigData}
                setSelectedMonth={handleSelectedMonth}
            />
            <WigSection
                wigData={
                    getGymMonthlyWigTableData?.data as IGymMonthlyWigTableProperties
                }
                loading={getGymMonthlyWigTableLoading}
                gymData={getGymData}
            />
            <GapAnalysis
                loading={getGapAnalysisLoading}
                data={getGapAnalysisData || ({} as IGapAnalysis)}
                gymData={getGymData || ({} as IGym)}
            />
            {getGymData && (
                <LeadMeasures
                    gym={getGymData}
                    gapAnalysis={getGapAnalysisData || ({} as IGapAnalysis)}
                />
            )}
            <Modal
                isOpen={isOpenWigModal}
                onClose={() => setIsOpenWigModal(false)}
            >
                {currentStep === 1 ? (
                    <Step1 gymData={getGymData} onClickNext={handleNext} />
                ) : currentStep === 2 ? (
                    <Step2
                        currentMonth={currentMonth}
                        gymMonthRevenue={getGymMonthRevenueData}
                        onClickNext={handleSavePreviousMonth}
                    />
                ) : (
                    <Step3
                        onClickGenerateWigDashboard={() => {
                            fetchWigMonthlyTable();
                            fetchGymMonthlyWig();
                            setIsOpenWigModal(false);
                            setCurrentStep(1);
                        }}
                    />
                )}
            </Modal>
            <Modal
                isOpen={isOpenMonthlyRevenueModal}
                onClose={() => setIsOpenMonthlyRevenueModal(false)}
            >
                <WigScheduleForm
                    selectedMonth={selectedMonth}
                    onDismiss={() => setIsOpenMonthlyRevenueModal(false)}
                    onSubmit={() => {
                        fetchWigMonthlyTable();
                        fetchGymMonthlyWig();
                        setIsOpenMonthlyRevenueModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default Wig;
