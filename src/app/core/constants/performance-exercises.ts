import { PerformanceExercise } from "../interfaces/exercise.interface";

export const PERFORMANCE_EXERCISES: PerformanceExercise = {
	stability: [
		{
			type: 'Push',
			name: 'Knee Push Ups',
			reps: 10,
		},
		{
			type: 'Hip',
			name: 'SUS Split Squat',
			repsText: '5E',
			reps: 10,
		},
		{
			type: 'Pull',
			name: '60 Deg. SUS Row',
			reps: 10,
		},
		{
			type: 'Knee',
			name: '12" Step Up',
			repsText: '5E',
			reps: 10,
			weight_key: 'twelve_step_up_weight'
		},
		{
			type: 'Cond.',
			name: 'Elev Mountain Climber',
			reps: 20,
		}
	],
	strength: [
		{
			type: 'Push',
			name: 'DB Floor Press',
			reps: 10,
			weight_key: 'db_floor_press_weight'
		},
		{
			type: 'Hip',
			name: 'DBL KB DL',
			reps: 10,
			weight_key: 'dbl_kb_dl_weight'
		},
		{
			type: 'Pull',
			name: '90 Deg. SUS Row',
			reps: 10,
		},
		{
			type: 'Knee',
			name: 'Goblet Squat',
			reps: 10,
			weight_key: 'goblet_squat_weight'
		},
		{
			type: 'Cond.',
			name: 'Mountain Climber',
			reps: 20,
		}
	],
	power: [
		{
			type: 'Push',
			name: 'KB OH Press',
			reps: 5,
			weight_key: 'kb_oh_press_weight'
		},
		{
			type: 'Hip',
			name: 'KB Swing',
			reps: 10,
			weight_key: 'kb_swing_weight'
		},
		{
			type: 'Pull',
			name: 'Asst Chin Up',
			reps: 5,
		},
		{
			type: 'Knee',
			name: 'DBL Racked Squat',
			reps: 10,
			weight_key: 'dbl_racked_squat_weight'
		},
		{
			type: 'Cond.',
			name: 'Burpee',
			reps: 10,
		}
	],
	optimal_life: [
		{
			type: 'Push',
			name: 'Cable Press',
			reps: 10,
			weight_key: 'cable_press_weight'
		},
		{
			type: 'Hip',
			name: 'Sus Split Squat/SUS Squat',
			repsText: '5E',
			reps: 10,
		},
		{
			type: 'Pull',
			name: '60 Deg. SUS Row',
			reps: 10,
		},
		{
			type: 'Knee',
			name: '12" Step Up/Smaller box',
			repsText: '5E',
			reps: 10,
		}
	]
}