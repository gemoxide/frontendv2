import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducer";
import rbcLogo from "../../../../../assets/img/RBC_Full_White.png";
import { IEightWeekProgress } from "../../interfaces/reports.interface";

interface Props {
    eightWeekProgress?: IEightWeekProgress;
}

const EightWeeks: React.FC<Props> = ({ eightWeekProgress }) => {
    const { data: currentUser } = useSelector(
        (state: RootState) => state.auth.user
    );

    return (
        <div className="slide text-white">
            <div className="w-[90vh]">
                <h2 className="text-[4em] xl:text-[5em] font-semibold text-center">
                    In Just 8 Weeks...
                </h2>
                <div className="flex flex-col h-full w-full">
                    <div className="flex items-center">
                        <span className="mr-2 uppercase font-black text-3xl xl:text-4xl">
                            Inches lost
                        </span>
                        <span className="flex-grow border-b-4 border-dotted border-white"></span>
                        <span className="ml-2 font-black text-[3.5em] xl:text-[4em]">
                            {eightWeekProgress?.inches || 0}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2 uppercase font-black text-3xl xl:text-4xl">
                            pounds lost
                        </span>
                        <span className="flex-grow border-b-4 border-dotted border-white"></span>
                        <span className="ml-2 font-black text-[3.5em] xl:text-[4em]">
                            {eightWeekProgress?.weight || 0}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2 uppercase font-black text-3xl xl:text-4xl">
                            body fat lost
                        </span>
                        <span className="flex-grow border-b-4 border-dotted border-white"></span>
                        <span className="ml-2 font-black text-[3.5em] xl:text-[4em]">
                            {eightWeekProgress?.body_fat || 0}
                        </span>
                    </div>
                    <div className="flex items-center mb-5">
                        <span className="mr-2 uppercase font-black text-3xl xl:text-4xl">
                            performance test
                        </span>
                        <span className="flex-grow border-b-4 border-dotted border-white"></span>
                        <span className="ml-2 font-black text-[3.5em] xl:text-[4em]">
                            {eightWeekProgress?.performance_test || 0}
                        </span>
                    </div>

                    <div className="flex flex-col items-center mb-3">
                        <div className="text-center">
                            <div className="border-t border-white mb-3 mx-auto w-50"></div>
                            <span className="text-3xl xl:text-4xl font-black">
                                Clients Journey To Date
                            </span>
                            <div className="border-t border-white mt-3 mx-auto w-50"></div>
                        </div>
                        <p>
                            <span className="mr-2 font-black text-[3.5em] xl:text-[4em]">
                                {eightWeekProgress?.weight || 0}
                            </span>
                            <span className="uppercase font-black text-4xl">
                                pounds lost
                            </span>
                        </p>
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

export default EightWeeks;
