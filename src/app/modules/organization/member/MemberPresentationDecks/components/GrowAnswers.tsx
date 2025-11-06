import { Fragment, useEffect } from "react";
import { mapDispatchToProps } from "../../../../../core/state/reducer/answers";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../core/state/reducer";

interface Props {
    id: string;
}

const GrowAnswers: React.FC<Props> = ({ id }) => {
    const { id: memberId } = useParams();

    const { getMemberPresentationDeckGrowAnswers } = mapDispatchToProps();

    const { data, loading, success } = useSelector(
        (state: RootState) => state.answers.getMemberPresentationDeckGrowAnswers
    );

    useEffect(() => {
        if (!!id && !!memberId) {
            getMemberPresentationDeckGrowAnswers({
                id: id,
                member_id: memberId,
            });
        }
    }, [id]);

    return (
        <div className="w-full flex flex-col gap-y-2 pb-5 py-2 px-5 h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-extrabold text-secondary">
                Form Answers
            </h2>
            <h3 className="text-xl font-bold">Habits</h3>
            <div className="px-5">
                <p>
                    When was the{" "}
                    <span className="font-bold uppercase">last time</span> you
                    felt you were in the{" "}
                    <span className="font-bold uppercase">
                        best shape of your life
                    </span>
                    ?
                </p>
                <p className="indent-5">
                    {data?.attributes.past_best_shape_years ||
                    data?.attributes.past_best_shape_months
                        ? `${data?.attributes.past_best_shape_years} Years, ${data?.attributes.past_best_shape_months} Months`
                        : "No Answer"}
                </p>
                <h4 className="text lg font-bold">
                    How much{" "}
                    <span className="font-bold uppercase">hours per week</span>{" "}
                    do you spend doing the following?
                </h4>
                <p>Social Media</p>
                <p className="indent-5">
                    {data?.attributes.time_budget_social_media &&
                    data?.attributes.time_budget_social_media >= 0
                        ? `${data?.attributes.time_budget_social_media} Hours`
                        : "No Answer"}
                </p>

                <p>Streaming</p>
                <p className="indent-5">
                    {data?.attributes.time_budget_streaming &&
                    data?.attributes.time_budget_streaming >= 0
                        ? `${data?.attributes.time_budget_streaming} Hours`
                        : "No Answer"}
                </p>

                <p>Internet Surfing</p>
                <p className="indent-5">
                    {data?.attributes.time_budget_shopping &&
                    data?.attributes.time_budget_shopping >= 0
                        ? `${data?.attributes.time_budget_shopping} Hours`
                        : "No Answer"}
                </p>

                <p>Watching Sports or Video Gaming</p>
                <p className="indent-5">
                    {data?.attributes.time_budget_sports_gaming &&
                    data?.attributes.time_budget_sports_gaming >= 0
                        ? `${data?.attributes.time_budget_sports_gaming} Hours`
                        : "No Answer"}
                </p>

                <p>Other</p>
                <p className="indent-5">
                    {data?.attributes.time_budget_other &&
                    data?.attributes.time_budget_other >= 0
                        ? `${data?.attributes.time_budget_other} Hours`
                        : "No Answer"}
                </p>

                <h4 className="text lg font-bold">
                    How much <span className="font-bold">do you spend</span>{" "}
                    <span className="font-bold uppercase">per week</span> doing
                    the following?
                </h4>
                <p>Dining Out</p>
                <p className="indent-5">
                    {data?.attributes.wellness_budget_dining_out &&
                    data?.attributes.wellness_budget_dining_out >= 0
                        ? `$${data?.attributes.wellness_budget_dining_out}`
                        : "No Answer"}
                </p>

                <p>Energy Drinks/Coffee</p>
                <p className="indent-5">
                    {data?.attributes.wellness_budget_sick_cold_meds &&
                    data?.attributes.wellness_budget_sick_cold_meds >= 0
                        ? `$${data?.attributes.wellness_budget_sick_cold_meds}`
                        : "No Answer"}
                </p>

                <p>Retail Therapy</p>
                <p className="indent-5">
                    {data?.attributes.wellness_budget_shopping &&
                    data?.attributes.wellness_budget_shopping >= 0
                        ? `$${data?.attributes.wellness_budget_shopping}`
                        : "No Answer"}
                </p>

                <p>Groceries</p>
                <p className="indent-5">
                    {data?.attributes.wellness_budget_groceries &&
                    data?.attributes.wellness_budget_groceries >= 0
                        ? `$${data?.attributes.wellness_budget_groceries}`
                        : "No Answer"}
                </p>

                <p>What % is processed food</p>
                <p className="indent-5">
                    {data?.attributes.wellness_budget_percent_processed_food &&
                    data?.attributes.wellness_budget_percent_processed_food >= 0
                        ? `${data?.attributes.wellness_budget_percent_processed_food}%`
                        : "No Answer"}
                </p>
                <p>
                    <span className="font-bold uppercase">Tell me more</span>{" "}
                    about that. <span className="font-bold uppercase">How</span>{" "}
                    does that make{" "}
                    <span className="font-bold uppercase">you feel</span>?
                </p>
                <p className="indent-5">
                    {data?.attributes.wants_needs_feel || "No Answer"}
                </p>
            </div>
            <h3 className="text-xl font-bold">Coaching</h3>
            <div className="px-5">
                <p>
                    <span className="font-bold uppercase">What</span>
                    's <span className="font-bold uppercase">
                        your plan
                    </span> on{" "}
                    <span className="font-bold uppercase">reaching all</span>{" "}
                    your <span className="font-bold">goals</span>?
                </p>
                <p className="indent-5">
                    {data?.attributes.coaching_plan || "No Answer"}
                </p>

                <p>
                    On a scale of <span className="font-bold">1-10</span>, how{" "}
                    <span className="font-bold uppercase">confident</span> do
                    you feel you can{" "}
                    <span className="font-bold uppercase">achieve</span> your{" "}
                    <span className="font-bold uppercase">goals</span> on{" "}
                    <span className="font-bold uppercase">your own</span>?
                </p>
                <p className="indent-5">
                    {data?.attributes.coaching_plan || "No Answer"}
                </p>

                <p>
                    <span className="font-bold uppercase">What can i do</span>{" "}
                    to <span className="font-bold uppercase">help</span> you get
                    your <span className="font-bold uppercase">confidence</span>{" "}
                    to a <span className="font-bold">10</span>?{" "}
                    <span className="font-bold uppercase">Why</span> that
                    number?
                </p>
                <p className="indent-5">
                    {data?.attributes.coaching_help || "No Answer"}
                </p>
            </div>
            <h3 className="text-xl font-bold">Grow Summary</h3>
            <div className="px-5">
                <p>GOAL</p>
                <p className="indent-5">
                    {data?.attributes.summary_goal || "No Answer"}
                </p>

                <p>X Facto</p>
                <p className="indent-5">
                    {data?.attributes.summary_x_factor || "No Answer"}
                </p>

                <p>Obstacles</p>
                <p className="indent-5">
                    {data?.attributes.summary_obstacles || "No Answer"}
                </p>

                <p>Pillar Gap</p>
                <p className="indent-5">
                    {data?.attributes.summary_pillar_gap || "No Answer"}
                </p>
            </div>
        </div>
    );
};

export default GrowAnswers;
