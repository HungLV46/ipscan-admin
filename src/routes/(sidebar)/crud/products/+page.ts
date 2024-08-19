import { listProduct, type ProductResponseData } from '$lib/apis/product/list-products';
import type { ListWithPagingResponse } from '$lib/apis/types.js';
import * as _ from 'underscore';

import { type ProductGetResponseData } from '$lib/apis/product/get-product';
import type { UserDropdown } from '$lib/apis/user/list-users-dropdown';

export interface ProductPageData {
	product: ProductGetResponseData;
	users: UserDropdown[];
	statuses: string[];
	selected_statuses?: string[];
	genres: string[];
	selected_genres?: string[];
	player_supports: string[];
	selected_player_supports?: string[];
	game_modes: string[];
	selected_game_modes?: string[];
	manga_statuses: string[];
	selected_manga_statuses?: string[];
	manga_genres: string[];
	selected_manga_genres?: string[];
}

export async function load(): Promise<ListWithPagingResponse<ProductResponseData>> {
	return listProduct();
}
