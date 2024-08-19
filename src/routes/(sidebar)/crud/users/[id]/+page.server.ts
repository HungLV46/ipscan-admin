import { deleteUser } from '$lib/apis/user/delete-user';
import { updateUser } from '$lib/apis/user/update-user';
import { upload } from '$lib/apis/utils/upload';
import { PAGE_MODE } from '$lib/constants.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	upsert: async ({ params, request }) => {
		const id = parseInt(params.id);
		const data = await request.formData();

		let banner = data.get('banner_img') as File;
		let avatar = data.get('avatar_img') as File;

		const uploadedFiles = await Promise.all([
			banner.size > 0 ? upload(banner) : undefined,
			avatar.size > 0 ? upload(avatar) : undefined
		]);

		const requestData = {
			banner_img: uploadedFiles[0] ? uploadedFiles[0].data.s3_url : undefined,
			avatar_img: uploadedFiles[1] ? uploadedFiles[1].data.s3_url : undefined,
			name: data.get('name')?.toString(),
			bio: data.get('bio')?.toString(),
			email: data.get('email')?.toString(),
			additional_info: {
				headline: data.get('headline')?.toString(),
				location: data.get('location')?.toString(),
				socials: JSON.parse(data.get('socials')?.toString() || '[]')
			},
			attributes: [
				...JSON.parse(data.get('tags')?.toString() || '[]').map((value: string) => ({
					name: 'tag',
					value
				})),
				...JSON.parse(data.get('wallets')?.toString() || '[]').map(
					(value: { address: string }) => ({
						name: 'wallet',
						value: value.address
					})
				)
			]
		};

		const updateResponse = await updateUser(id, requestData);

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

		if (!id) return fail(400, { error: 400, message: 'Id is missing' });

		const resposne = await deleteUser(parseInt(id));

		const responseData = await resposne.json();

		if (resposne.status === 200) {
			throw redirect(303, '/crud/users');
		}

		return fail(resposne.status, responseData);
	}
};
