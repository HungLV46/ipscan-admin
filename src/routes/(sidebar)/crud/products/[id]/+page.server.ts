import { deleteProduct } from '$lib/apis/product/delete-product';
import { updateProduct } from '$lib/apis/product/update-product.js';
import { upload } from '$lib/apis/utils/upload';
import { PAGE_MODE } from '$lib/constants.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	upsert: async ({ params, request }) => {
		const id = parseInt(params.id);
		const data = await request.formData();

		console.log('form', data);

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
			featured: data.get('featured')?.toString() !== undefined,
			category: data.get('category')?.toString() || undefined,
			collections: JSON.parse(data.get('collections')?.toString() || '[]'),
			description: data.get('about')?.toString(),
			owner_id: parseInt(data.get('creator')?.toString() || '-1'), // TODO get users
			metadata: {
				previews: uploadedFiles[2]
					? uploadedFiles.slice(2).map((file) => file?.data.s3_url as string)
					: JSON.parse(data.get('prev_previews')?.toString() || '[]').map(
							(img: { src: string }) => img.src
						),
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
				}))
			]
		};

		console.log('request', requestData);

		const updateResponse = await updateProduct(id, requestData);

		const responseData = await updateResponse.json();

		if (updateResponse.status === 200) {
			// TODO find a more systematical way to reload a page
			return fail(responseData.statusCode, { reload: true, mode: PAGE_MODE.VIEW });
		} else {
			return fail(responseData.statusCode, responseData);
		}
	},
	delete: async ({ request }) => {
		const id = (await request.formData()).get('deleteId')?.toString();

		console.log('id', id);

		if (!id) return fail(400, { missingId: true });

		const resposne = await deleteProduct(parseInt(id));

		console.log(resposne);

		if (resposne.status === 200) {
			throw redirect(303, '/crud/products');
		}
	}
};
