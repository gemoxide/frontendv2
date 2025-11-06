export const mapNumberOptions = (number: number) => {
	return [...Array(number)].map((_, i) => ({
		value: i + 1,
		label: (i + 1).toString()
	}))
}