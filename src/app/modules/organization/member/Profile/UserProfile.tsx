import { useEffect } from "react";
import { ROUTES } from "../../../../core/constants/routes";
import { mapDispatchToProps } from "../../../../core/state/reducer/users";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Notes from "./Notes/Notes";

//components
import CreateUserForm from "./CreateUserForm";
import QuickLinks from "./QuickLinks/QuickLinks";

import Section from "../../../../core/components/Section";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/state/reducer";
// import BarGraph from "../../../../core/components/BarChart";
// import ProgressBar from "../../../../core/components/ProgressBar";

const UserProfile = () => {
    const { getUser, resetGetUser } = mapDispatchToProps();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        error,
        data,
    } = useSelector((state: RootState) => state.users.getUser);


    useEffect(() => {
        if (error) {
            toast.error("User not found redirecting to members list");
            navigate(ROUTES.USER.gymSettings.key);
        }
    }, [error]);

    const handleRemoveSelectedUser = () => {
        navigate(location.pathname, {
            state: { ...location.state },
        });
    };

    useEffect(() => {
        if (id) {
            getUser(id);
        }
    }, [id]);

    // const sampleData = [
    //     { month: 1, value: 10 },
    //     { month: 2, value: 20 },
    //     { month: 3, value: 15 },
    //     { month: 4, value: 30 },
    //     { month: 5, value: 25 },
    //     { month: 6, value: 40 },
    //     { month: 7, value: 35 },
    //     { month: 8, value: 50 },
    //     { month: 9, value: 45 },
    //     { month: 10, value: 60 },
    //     { month: 11, value: 55 },
    //     { month: 12, value: 70 },
    // ];

    // const bootcamps = [
    //     { name: "6-Week Bootcamp", progress: 50 },
    //     { name: "12-Week Bootcamp", progress: 75 },
    //     { name: "8-Week Bootcamp", progress: 60 },
    // ];

    return (
        <Section title="User Profile">
            <div className="flex space-x-5">
                <div className="w-8/12">
                    {/* WIP: For future tasks */}
                    {/* <div className="flex flex-col space-y-5">
                        <div className="rounded-md bg-white h-full p-8 mt-4">
                            <BarGraph
                                data={sampleData}
                                xKey="month"
                                yKey="value"
                                xLabel=""
                                yLabel=""
                                title={"Task Completed"}
                            />
                        </div>

                        <div className="rounded-md bg-white h-full p-8 mt-4">
                            <div>
                                {bootcamps.map((bootcamp, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between mb-2.5">
                                            <p className="text-secondary text-base font-normal">
                                                {bootcamp.name}
                                            </p>
                                            <p className="text-secondary text-base font-semibold">
                                                {bootcamp.progress}
                                            </p>
                                        </div>
                                        <ProgressBar
                                            progress={bootcamp.progress.toString()}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between space-x-5">
                            <div className="w-1/2 rcombineReducersounded-md bg-white h-full p-8 mt-4">
                                Pie Chart 1
                            </div>
                            <div className="w-1/2 rounded-md bg-white h-full p-8 mt-4">
                                Pie Chart 2
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="w-4/12">
                    <div className="flex flex-col">
                        <div className="rounded-md bg-white h-full p-8 mt-4">
                            <CreateUserForm
                                selectedUser={data}
                                clearSelectedUser={handleRemoveSelectedUser}
                            />
                        </div>
                        <Notes />
                        <QuickLinks />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default UserProfile;
