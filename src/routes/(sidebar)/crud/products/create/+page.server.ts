import { createProduct } from '$lib/apis/product/create-product';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log(data);

		const requestData = {
			banner_img: data.get('banner_img') as string,
			avatar_img: data.get('avatar_img') as string,
			name: data.get('name') as string,
			featured_at: new Date().toISOString(),
			category: data.get('category') as string,
			collections: JSON.parse(data.get('collections') as string),
			description: data.get('about') as string,
			owner: { id: 1 }, // TODO get users
			metadata: JSON.stringify({
				// previews: data.get("previews"), TODO upload then use url
				previews: JSON.parse(data.get('previews') as string).map(() => 'http://demmo.jjj'),
				cta_url: data.get('cta_url')
			}), // TODO use object instead
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
		console.log(JSON.stringify(requestData));
		await createProduct(requestData);
	}
};
