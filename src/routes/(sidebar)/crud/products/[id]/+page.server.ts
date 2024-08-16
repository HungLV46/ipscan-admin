import { updateProduct } from '$lib/apis/product/update-product.js';
import { PAGE_MODE } from '$lib/constants.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ params, request }) => {
		const id = parseInt(params.id);
		const data = await request.formData();

		const requestData = {
			// banner_img: data.get('banner_img') as string, // TODO upload banner
			// avatar_img: data.get('avatar_img') as string, // TODO upload img
			banner_img: 'https://picsum.photos/seed/4mv5QDNfnf/640/480',
			avatar_img: 'https://picsum.photos/seed/4mv5QDNfnf/640/480',
			name: data.get('name') as string,
			featured: data.get('featured') === 'true',
			category: data.get('category') as string,
			collections: JSON.parse(data.get('collections') as string),
			description: data.get('about') as string,
			owner_id: parseInt(data.get('creator') as string), // TODO get users
			metadata: {
				// previews: data.get("previews"), TODO upload then use url
				previews: JSON.parse(data.get('previews') as string).map(() => 'http://demmo.jjj'),
				cta_url: data.get('cta_url') || undefined
			},
			attributes: [
				...JSON.parse(data.get('statuses') as string).map((value: string) => ({
					name: 'status',
					value
				})),
				...JSON.parse(data.get('genres') as string).map((value: string) => ({
					name: 'genre',
					value
				})),
				...JSON.parse(data.get('players_infos') as string).map((value: string) => ({
					name: 'players info',
					value
				})),
				...JSON.parse(data.get('game_modes') as string).map((value: string) => ({
					name: 'game mode',
					value
				}))
			]
		};

		const updateResponse = await updateProduct(id, requestData);

		const responseData = await updateResponse.json();

		console.log('responseData', responseData); // TODO remove

		if (updateResponse.status === 200) {
			// TODO find a more systematical way to reload a page
			return fail(responseData.statusCode, { reload: true, mode: PAGE_MODE.VIEW });
		} else {
			return fail(responseData.statusCode, responseData);
		}
	}
};
