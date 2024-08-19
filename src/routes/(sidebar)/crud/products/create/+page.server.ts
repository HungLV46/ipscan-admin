import { createProduct } from '$lib/apis/product/create-product';
import { upload } from '$lib/apis/utils/upload.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	upsert: async ({ request }) => {
		const data = await request.formData();

		let banner = data.get('banner_img') as File;
		let avatar = data.get('avatar_img') as File;
		let previews = data.getAll('previews') as File[];

		const uploadedFiles = await Promise.all([
			banner.size > 0 ? upload(banner) : undefined,
			avatar.size > 0 ? upload(avatar) : undefined,
			...(previews[0].size > 0 ? previews.map((file) => upload(file)) : [undefined])
		]);

		const requestData = {
			banner_img: uploadedFiles[0] ? uploadedFiles[0].data.s3_url : undefined,
			avatar_img: uploadedFiles[1] ? uploadedFiles[1].data.s3_url : undefined,
			name: data.get('name')?.toString(),
			featured: data.get('featured')?.toString() === 'true',
			category: data.get('category')?.toString() || undefined,
			collections: JSON.parse(data.get('collections')?.toString() || '[]'),
			description: data.get('about')?.toString(),
			owner_id: parseInt(data.get('creator')?.toString() || '-1'), // TODO get users
			metadata: {
				previews: uploadedFiles[2]
					? uploadedFiles.slice(2).map((file) => file?.data.s3_url as string)
					: undefined,
				cta_url: data.get('cta_url')?.toString(),
				socials: JSON.parse(data.get('socials')?.toString() || '[]')
			},
			attributes: [
				...JSON.parse(data.get('statuses')?.toString() || '[]').map((value: string) => ({
					name: 'status',
					value
				})),
				...JSON.parse(data.get('genres')?.toString() || '[]').map((value: string) => ({
					name: 'genre',
					value
				})),
				...JSON.parse(data.get('players_infos')?.toString() || '[]').map((value: string) => ({
					name: 'player support',
					value
				})),
				...JSON.parse(data.get('game_modes')?.toString() || '[]').map((value: string) => ({
					name: 'game mode',
					value
				})),
				...JSON.parse(data.get('manga_statuses')?.toString() || '[]').map((value: string) => ({
					name: 'manga status',
					value
				})),
				...JSON.parse(data.get('manga_genres')?.toString() || '[]').map((value: string) => ({
					name: 'manga genre',
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
