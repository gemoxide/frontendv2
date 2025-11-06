import { StringLocale } from "yup/lib/locale";

export interface MemberFormAnswer {
	form_field_id: string;
	field_name?: string;
	answer: string;
}

export type CreateMemberFormAnswersParam = {
	member_id: number;
	member_presentation_deck_id: number;
	answers: MemberFormAnswer[]
}

export type IMemberAnswer = {
	type: string;
	id: number;
	attributes: {
		answer: string;
	}
}

export interface CreateGrowPresentationAnswersParam {
	member_id: string,
	id: string,
	payload: Partial<IGrowSlideAnswer['attributes']>
}

export interface IGrowSlideAnswer {
	type: string;
	id: number;
	attributes: {
		goals_motivations_fitness_goals?: string;
		goals_motivations_affect_life?: string;
		goals_motivations_important?: number;
		goals_motivations_months?: number;
		goals_motivations_years?: number;
		goals_motivations_affected?: string;
		goals_motivations_support?: string;
		goals_motivations_feel?: string;
		past_fitness_nutrition_program?: string;
		past_diets_exercise?: string;
		past_best_shape_months?: number;
		past_best_shape_years?: number;
		past_feel?: string;
		past_different?: string;
		past_reasons?: string;
		past_habits?: number;
		past_has_wellness_budget?: boolean;
		time_budget_social_media?: number;
		time_budget_streaming?: number;
		time_budget_shopping?: number;
		time_budget_sports_gaming?: number;
		time_budget_other?: number;
		wellness_budget_dining_out?: number;
		wellness_budget_sick_cold_meds?: number;
		wellness_budget_shopping?: number;
		wellness_budget_groceries?: number;
		wellness_budget_percent_processed_food?: number;
		wants_needs_feel?: string;
		coaching_plan?: string;
		coaching_confidence?: number;
		coaching_help?: string;
		summary_goal?: string;
		summary_x_factor?: string;
		summary_obstacles?: string;
		summary_pillar_gap?: string;
		plan_prescribed?: string;
		plan_types?:  string[];
		plan_member_selected?: string;
		plan_coaching_status?: string;
		plan_notes?: string;
	}
}