import { listProduct, type ProductResponseData } from '$lib/apis/product/list-products';
import type { ListWithPagingResponse } from '$lib/apis/types.js';
import * as _ from 'underscore';

import { type ProductGetResponseData } from '$lib/apis/product/get-product';

export interface ProductPageData {
	mode?: string;
	product?: ProductGetResponseData;
	statuses: string[];
	selected_statuses?: string[];
	genres: string[];
	selected_genres?: string[];
	player_supports: string[];
	selected_player_supports?: string[];
	game_modes: string[];
	selected_game_modes?: string[];
}

export async function load(): Promise<ListWithPagingResponse<ProductResponseData>> {
	return listProduct();
}
