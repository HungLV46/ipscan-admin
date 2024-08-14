import { listProductAttributes } from '$lib/apis/product/list-product-attributes.js';
import _ from 'underscore';
import type { ProductPageData } from '../+page';

export async function load(): Promise<ProductPageData> {
	const [productAttributes] = await Promise.all([listProductAttributes()]);

	const nameToValues = _.groupBy(productAttributes.items, 'name');

	return {
		product: {
			name: '',
			category: '',
			description: '',
			avatar_img: '',
			banner_img: '',
			owner: {},
			metadata: {},
			featured_at: null,
			attributes: [],
			collections: []
		},
		statuses: nameToValues['status']?.map((v) => v.value),
		genres: nameToValues['genre']?.map((v) => v.value),
		player_supports: nameToValues['player support']?.map((v) => v.value),
		game_modes: nameToValues['game mode']?.map((v) => v.value)
	};
}
