export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString();
};

export const formatDateToLocalString = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
