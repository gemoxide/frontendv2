export const ROTATION_CLASSES = [
	"rotate-0",
	"rotate-90 max-w-[90vh]",
	"rotate-180",
	"-rotate-90 max-w-[90vh]"
]

export const TRANSITION_ROTATION_CLASSES = [
	"",
	"flex justify-end",
	"",
	"flex justify-start"
]

export const rotationClasses = (isFullScreen: boolean, isCoachedData: boolean) => {
	return [
		"rotate-0",
		`rotate-90 ${isFullScreen ? 'max-w-screen' : 'max-w-[90vh]'} ${isCoachedData && '!max-w-[100vh]'}`,
		"rotate-180",
		`-rotate-90 ${isFullScreen ? 'max-w-screen' : 'max-w-[90vh]'} ${isCoachedData && '!max-w-[100vh]'}`,
	]
}

export const transitionRotationClasses = (isImage: boolean) => {
	return [
		"",
		`flex ${isImage ? 'justify-end' : 'justify-center'}`,
		"",
		`flex ${isImage ? 'justify-start' : 'justify-center'}`
	]
}