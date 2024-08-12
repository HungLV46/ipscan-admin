export interface ListWithPagingResponse<T> {
	items: T[];
	paging: {
		total: number;
		limit: number;
		offset: number;
	};
}

export interface ListResponse<T> {
	items: T[];
}
