import * as Yup from "yup";

export const GoalsMotivationSchema = Yup.object().shape({
    goals_motivations_fitness_goals: Yup.string().required("Field is required"),
    goals_motivations_affect_life: Yup.string().required("Field is required"),
    goals_motivations_important: Yup.number().required("Field is required").min(1, 'Must be at least 1').max(10, 'Must be at most 10'),
    goals_motivations_months: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    goals_motivations_years: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    goals_motivations_affected: Yup.string().required("Field is required"),
    goals_motivations_support: Yup.string().required("Field is required"),
    goals_motivations_feel: Yup.string().required("Field is required"),
});


export const PastSchema = Yup.object().shape({
    past_fitness_nutrition_program: Yup.string().required("Field is required"),
    past_diets_exercise: Yup.string().required("Field is required"),
    past_habits: Yup.number().required("Field is required").min(1, 'Must be at least 1').max(10, 'Must be at most 10'),
    past_best_shape_years: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    past_best_shape_months: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    past_feel: Yup.string().required("Field is required"),
    past_different: Yup.string().required("Field is required"),
    past_reasons: Yup.string().required("Field is required"),
    past_has_wellness_budget: Yup.boolean().required("Field is required"),
});

export const BudgetSchema = Yup.object().shape({
    time_budget_social_media: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    time_budget_streaming: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    time_budget_shopping: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    time_budget_sports_gaming: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    time_budget_other: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    wellness_budget_dining_out: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    wellness_budget_sick_cold_meds: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    wellness_budget_shopping: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    wellness_budget_groceries: Yup.number().required("Field is required").min(0, 'Must be at least 0'),
    wellness_budget_percent_processed_food: Yup.number().required("Field is required").min(0, 'Must be at least 0').max(100, 'Must be at most 100'),
    wants_needs_feel: Yup.string().required("Field is required"),
});

export const CoachingSchema = Yup.object().shape({
    coaching_plan: Yup.string().required("Field is required"),
    coaching_confidence: Yup.number().required("Field is required").min(1, 'Must be at least 1').max(10, 'Must be at most 10'),
    coaching_help: Yup.string().required("Field is required"),
});

export const SummarySchema = Yup.object().shape({
    summary_goal: Yup.string().required("Field is required"),
    summary_x_factor: Yup.string().required("Field is required"),
    summary_obstacles: Yup.string().required("Field is required"),
    summary_pillar_gap: Yup.string().required("Field is required"),
});

export const PlanSchema = Yup.object().shape({
    plan_prescribed: Yup.string().required("Field is required"),
    plan_types: Yup.array().min(1).required("Field is required"),
    plan_member_selected: Yup.string().required("Field is required"),
    plan_coaching_status: Yup.string().required("Field is required"),
    plan_notes: Yup.string().required("Field is required"),
});