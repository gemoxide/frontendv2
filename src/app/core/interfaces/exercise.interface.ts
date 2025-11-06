export interface Exercise {
	type: 'Push' | 'Pull' | 'Knee' | 'Hip' | 'Cond.';
	name: string;
	repsText?: string;
	reps: number;
	weight_key?: string;
}

export interface PerformanceExercise {
	stability: Exercise[];
	power: Exercise[];
	strength: Exercise[];
	optimal_life: Exercise[];
}