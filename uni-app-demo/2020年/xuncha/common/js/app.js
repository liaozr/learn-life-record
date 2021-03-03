export const toast = (option) => {
	if (option.constructor === String) {
		uni.showToast({
			icon: 'none',
			title: option,
			duration:3000,
		})
	} else {
		uni.showToast(option);
	}
}
