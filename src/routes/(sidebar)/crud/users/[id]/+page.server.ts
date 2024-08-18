import { updateUser } from '$lib/apis/user/update-user';
import { PAGE_MODE } from '$lib/constants.js';
import { fail } from '@sveltejs/kit';

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
			bio: data.get('about') as string,
			owner_id: parseInt(data.get('creator') as string), // TODO get users
			additional_info: {
				socials: JSON.parse(data.get('socials') as string),
				wallets: JSON.parse(data.get('wallet_addresses') as string)
			},
			attributes: [
				...JSON.parse(data.get('tags') as string).map((value: string) => ({
					name: 'tag',
					value
				}))
			]
		};

		const updateResponse = await updateUser(id, requestData);

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
