export const preventDecimal = (evt: React.KeyboardEvent<HTMLInputElement>) => {
	(evt.key === "e" || evt.key === ".") &&
		evt.preventDefault()
}
