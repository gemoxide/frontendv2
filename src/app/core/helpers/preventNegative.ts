export const preventNegative = (evt: React.KeyboardEvent<HTMLInputElement>) => {
	(evt.key === "-") &&
		evt.preventDefault()
}
