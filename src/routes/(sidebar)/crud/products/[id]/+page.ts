import { getProductById } from '$lib/apis/product/get-product';
import { listProductAttributes } from '$lib/apis/product/list-product-attributes.js';
import _ from 'underscore';
import type { ProductPageData } from '../+page';
import { listUser } from '$lib/apis/user/list-users';
import { listUsersDropdown } from '$lib/apis/user/list-users-dropdown';

export async function load(pageLoadEvent): Promise<ProductPageData> {
	const [product, productAttributes, users] = await Promise.all([
		getProductById(parseInt(pageLoadEvent.params.id)),
		listProductAttributes(),
		listUsersDropdown({ limit: 1000, offset: 0 })
	]);

	const nameToValues = _.groupBy(productAttributes.items, 'name');
	const selectedNameToValues = _.groupBy(product.attributes, 'name');

	return {
		product,
		users: users.items,
		statuses: nameToValues['status']?.map((v) => v.value),
		selected_statuses: selectedNameToValues['status']?.map((v) => v.value),
		genres: nameToValues['genre']?.map((v) => v.value),
		selected_genres: selectedNameToValues['genre']?.map((v) => v.value),
		player_supports: nameToValues['player support']?.map((v) => v.value),
		selected_player_supports: selectedNameToValues['player support']?.map((v) => v.value),
		game_modes: nameToValues['game mode']?.map((v) => v.value),
		selected_game_modes: selectedNameToValues['game mode']?.map((v) => v.value),
		manga_statuses: nameToValues['manga status']?.map((v) => v.value),
		selected_manga_statuses: selectedNameToValues['manga status']?.map((v) => v.value),
		manga_genres: nameToValues['manga genre']?.map((v) => v.value),
		selected_manga_genres: selectedNameToValues['manga genre']?.map((v) => v.value)
	};
}
