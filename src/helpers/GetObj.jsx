

export const getObj = (array, id) => {

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			if (array[i][j].id === id) {
				return array[i][j];
			}
		}
	}
}