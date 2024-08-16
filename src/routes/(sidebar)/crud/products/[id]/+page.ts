import { getProductById } from '$lib/apis/product/get-product';
import { listProductAttributes } from '$lib/apis/product/list-product-attributes.js';
import _ from 'underscore';
import type { ProductPageData } from '../+page';

export async function load(pageLoadEvent): Promise<ProductPageData> {
	const [product, productAttributes] = await Promise.all([
		getProductById(parseInt(pageLoadEvent.params.id)),
		listProductAttributes()
	]);

	const nameToValues = _.groupBy(productAttributes.items, 'name');
	const selectedNameToValues = _.groupBy(product.attributes, 'name');

	return {
		product,
		statuses: nameToValues['status']?.map((v) => v.value),
		selected_statuses: selectedNameToValues['status']?.map((v) => v.value),
		genres: nameToValues['genre']?.map((v) => v.value),
		selected_genres: selectedNameToValues['genre']?.map((v) => v.value),
		player_supports: nameToValues['player support']?.map((v) => v.value),
		selected_player_supports: selectedNameToValues['player support']?.map((v) => v.value),
		game_modes: nameToValues['game mode']?.map((v) => v.value),
		selected_game_modes: selectedNameToValues['game mode']?.map((v) => v.value)
	};
}
