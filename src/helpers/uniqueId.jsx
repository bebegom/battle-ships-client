

export const uniqueId = () => {
		const id = "id" + Math.random().toString(16).slice(2)
		return id
}