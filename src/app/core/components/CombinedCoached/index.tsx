import React, { useEffect } from "react";
import { ReactComponent as ArrowUp } from "../../../../../assets/icons/arrow-upward.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/icons/arrow-down.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import rbcLogo from "../../../../../assets/img/RBC_Full_White.png";
import { ICoachedClientCombinedProgress } from "../../interfaces/reports.interface";

interface Props {
    combinedProgress?: ICoachedClientCombinedProgress;
}

const CombinedCoached: React.FC<Props> = ({ combinedProgress }) => {
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    return (
        <div className="slide text-white">
            <div className="w-[90vh]">
                <h2 className="uppercase text-4xl font-bold text-center">
                    Coached Clients Combined Progress
                </h2>
                <div id="items" className="mx-auto mt-10 w-fulll">
                    <div className="flex mb-3 w-full">
                        <div className="flex justify-between w-full">
                            <span className="text-[2.25em] xl:text-[3em] w-8/12">
                                Inches
                            </span>
                            <div className="mx-5 w-2/12 flex justify-end items-center">
                                <ArrowDown className="w-10 h-10 fill-primary" />
                            </div>
                            <div className="flex items-center justify-start w-2/12">
                                <span className="text-[2.25em] xl:text-[2.5em] font-black text-right">
                                    {combinedProgress?.inches || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-3 w-full">
                        <div className="flex w-full">
                            <span className="text-[2.25em] xl:text-[2.5em] w-8/12">
                                % Body Fat
                            </span>
                            <div className="mx-5 w-2/12 flex justify-end items-center">
                                <ArrowDown className="w-10 h-10 fill-primary" />
                            </div>
                            <div className="flex items-center justify-start w-2/12">
                                <span className="text-[2.25em] xl:text-[2.5em] font-black text-right">
                                    {combinedProgress?.body_fat || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-3 w-full">
                        <div className="flex w-full">
                            <span className="text-[2.25em] xl:text-[2.5em] w-8/12">
                                #'s of Fat
                            </span>
                            <div className="mx-5 w-2/12 flex justify-end items-center">
                                <ArrowDown className="w-10 h-10 fill-primary" />
                            </div>
                            <div className="flex items-center justify-start w-2/12">
                                <span className="text-[2.25em] xl:text-[2.5em] font-black text-right">
                                    {combinedProgress?.number_of_fats || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-3 w-full">
                        <div className="flex w-full">
                            <span className="text-[2.25em] xl:text-[2.5em] w-8/12">
                                #'s of Muscle
                            </span>
                            <div className="mx-5 w-2/12 flex justify-end items-center">
                                <ArrowUp className="w-10 h-10 fill-primary" />
                            </div>
                            <div className="flex items-center justify-start w-2/12">
                                <span className="text-[2.25em] xl:text-[2.5em] font-black text-right">
                                    {combinedProgress?.number_of_muscle || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-3 w-full">
                        <div className="flex w-full">
                            <span className="text-[2.25em] xl:text-[2.5em] w-8/12">
                                Funct. Movement
                            </span>
                            <div className="mx-5 w-2/12 flex justify-end items-center">
                                <ArrowUp className="w-10 h-10 fill-primary" />
                            </div>
                            <div className="flex items-center justify-start w-2/12">
                                <span className="text-[2.25em] xl:text-[2.5em] font-black">
                                    {combinedProgress?.functional_movement || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-3 w-full">
                        <div className="flex w-full">
                            <span className="text-[2.25em] xl:text-[2.5em] w-8/12">
                                Performance Test
                            </span>
                            <div className="mx-5 w-2/12 flex justify-end items-center">
                                <ArrowUp className="w-10 h-10 fill-primary" />
                            </div>
                            <div className="flex items-center justify-start w-2/12">
                                <span className="text-[2.25em] xl:text-[2.5em] font-black">
                                    {combinedProgress?.performance_test || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mb-5" />
                {currentUser?.relationships?.organization?.attributes?.logo ? (
                    currentUser?.relationships?.organization?.id === 48 ? ( //temporary fix for RBC for now. Will update on the other task
                        <img
                            src={rbcLogo}
                            className="w-40 mx-auto"
                            alt="logo"
                        />
                    ) : (
                        <img
                            src={
                                currentUser?.relationships.organization
                                    ?.attributes.logo
                            }
                            className="w-40 mx-auto"
                            alt="logo"
                        />
                    )
                ) : (
                    <div className="text-center mb-5">
                        <h3 className="text-4xl font-black mb-0">
                            #ResultsBasedCoaching
                        </h3>
                        <p className="text-2xl font-bold">
                            We assess...we don't guess
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CombinedCoached;
