import { createProduct } from '$lib/apis/product/create-product';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const requestData = {
			banner_img: data.get('banner_img') as string, // TODO upload banner
			avatar_img: data.get('avatar_img') as string, // TODO upload img
			name: data.get('name') as string,
			featured: data.get('featured') === 'true',
			category: data.get('category') as string,
			collections: JSON.parse(data.get('collections') as string),
			description: data.get('about') as string,
			owner_id: 1, // TODO get users
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

		const createResponse = await createProduct(requestData);

		const responseData = await createResponse.json();

		if (createResponse.status === 200) {
			throw redirect(303, `/crud/products/${responseData.data.id}`);
		} else {
			return fail(responseData.statusCode, responseData);
		}
	}
};
