import { listProductAttributes } from '$lib/apis/product/list-product-attributes';
import _ from 'underscore';
import type { ProductPageData } from '../+page';
import { listUsersDropdown } from '$lib/apis/user/list-users-dropdown';

export async function load(): Promise<ProductPageData> {
	const [productAttributes, users] = await Promise.all([
		listProductAttributes(),
		listUsersDropdown({ limit: 1000, offset: 0 })
	]);

	const nameToValues = _.groupBy(productAttributes.items, 'name');

	return {
		product: {
			name: '',
			owner: {
				id: undefined,
				name: undefined
			},
			avatar_img: '',
			banner_img: '',
			category: '',
			description: '',
			featured_at: null,
			attributes: [],
			metadata: undefined
		},
		users: users.items,
		statuses: nameToValues['status']?.map((v) => v.value),
		genres: nameToValues['genre']?.map((v) => v.value),
		player_supports: nameToValues['player support']?.map((v) => v.value),
		game_modes: nameToValues['game mode']?.map((v) => v.value),
		manga_statuses: nameToValues['manga status']?.map((v) => v.value),
		manga_genres: nameToValues['manga genre']?.map((v) => v.value)
	};
}
