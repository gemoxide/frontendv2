import React, { useEffect, useState } from "react";
import { IGym } from "../../../../core/interfaces/gyms.interface";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Range from "../../../../core/components/Range";
import Button from "../../../../core/components/Button";
import { updateWigRequest } from "../../../../core/services/gyms/gyms.service";
import { formatCurrency } from "../../../../core/helpers/formatCurrency";

type Props = {
    gymData?: IGym;
    refetchGym: () => void;
};

const Header: React.FC<Props> = ({ gymData, refetchGym }) => {
    const [showMembershipGrowthSection, setShowMembershipGrowthSection] =
        useState<boolean>(false);
    const [showPtGrowthSection, setShowPtGrowthSection] =
        useState<boolean>(false);
    const startMonthName = gymData?.attributes?.wig_start_date
        ? new Date(gymData.attributes.wig_start_date).toLocaleString(
              "default",
              { month: "long", timeZone: "UTC" }
          )
        : "";

    const currentMonthName = new Date().toLocaleString("default", {
        month: "long",
        timeZone: "UTC",
    });

    const [membershipGrowth, setMembershipGrowth] = useState<number>(0.25);
    const [ptGrowth, setPtGrowth] = useState<number>(0.25);

    const updateSlider = async () => {
        try {
            const payload = {
                id: gymData?.id,
                wig_monthly_membership_growth_percentage: membershipGrowth,
                wig_monthly_pt_growth_percentage: ptGrowth,
            };
            const { data } = await updateWigRequest(payload);
            if (data) {
                refetchGym();
                setShowMembershipGrowthSection(false);
                setShowPtGrowthSection(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setMembershipGrowth(
            Number(
                gymData?.attributes?.wig_monthly_membership_growth_percentage
            )
        );
        setPtGrowth(
            Number(gymData?.attributes?.wig_monthly_pt_growth_percentage)
        );
    }, [gymData]);

    return (
        <div>
            <div className="flex justify-around space-x-4 mt-10">
                <div className="flex flex-col space-y-2">
                    <span className="text-secondary text-xs font-extrabold">
                        Start Month
                    </span>
                    <h3 className=" text-grey-secondary text-3xl font-extrabold">
                        {startMonthName || "Not set"}
                    </h3>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-secondary text-xs font-extrabold">
                        Duration
                    </span>
                    <h3 className=" text-grey-secondary text-3xl font-extrabold">
                        {gymData?.attributes?.wig_duration
                            ? `${gymData?.attributes?.wig_duration} Month(s)`
                            : "Not set"}
                    </h3>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-secondary text-xs font-extrabold">
                        Current Month
                    </span>
                    <h3 className=" text-grey-secondary text-3xl font-extrabold">
                        {currentMonthName}
                    </h3>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-secondary text-xs font-extrabold">
                        Monthly Membership Growth %
                    </span>
                    {!showMembershipGrowthSection && (
                        <div className="flex items-center">
                            <h3 className="text-grey-secondary text-3xl font-extrabold">
                                {gymData?.attributes
                                    ?.wig_monthly_membership_growth_percentage
                                    ? `${gymData?.attributes?.wig_monthly_membership_growth_percentage}%`
                                    : "Not set"}
                            </h3>

                            <PencilSquareIcon
                                className="ml-2 h-5 w-5 text-primary font-bold"
                                role="button"
                                onClick={() =>
                                    setShowMembershipGrowthSection(true)
                                }
                            />
                        </div>
                    )}
                    {showMembershipGrowthSection && (
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className="text-grey-secondary text-2xl font-extrabold">
                                    {`${membershipGrowth}%`}
                                </h3>
                                <Button
                                    label="Save"
                                    className="bg-primary text-white btn-xs"
                                    onClick={updateSlider}
                                />
                            </div>

                            <Range
                                name="wig_monthly_pt_growth_percentage"
                                value={membershipGrowth}
                                onChange={(value) => setMembershipGrowth(value)}
                                isLabelDisplayed={false}
                                size={"sm"}
                                min={0.25}
                                max={25}
                                step={0.25}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="text-secondary text-xs font-extrabold">
                        Personal Training Growth %
                    </span>
                    {!showPtGrowthSection && (
                        <div className="flex items-center">
                            <h3 className=" text-grey-secondary text-3xl font-extrabold">
                                {gymData?.attributes
                                    ?.wig_monthly_pt_growth_percentage
                                    ? `${gymData?.attributes?.wig_monthly_pt_growth_percentage}%`
                                    : "Not set"}
                            </h3>
                            <PencilSquareIcon
                                className="ml-2 h-5 w-5 text-primary font-bold"
                                role="button"
                                onClick={() => setShowPtGrowthSection(true)}
                            />
                        </div>
                    )}
                    {showPtGrowthSection && (
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className="text-grey-secondary text-2xl font-extrabold">
                                    {`${ptGrowth}%`}
                                </h3>
                                <Button
                                    label="Save"
                                    className="bg-primary text-white btn-xs"
                                    onClick={updateSlider}
                                />
                            </div>

                            <Range
                                name="wig_monthly_pt_growth_percentage"
                                value={ptGrowth}
                                onChange={(value) => setPtGrowth(value)}
                                isLabelDisplayed={false}
                                size={"sm"}
                                min={0.25}
                                max={25}
                                step={0.25}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
