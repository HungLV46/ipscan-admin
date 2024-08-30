import { createUser } from '$lib/apis/user/create-user';
import { upload } from '$lib/apis/utils/upload';
import { PAGE_MODE } from '$lib/constants';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	upsert: async ({ request }) => {
		const data = await request.formData();

		let banner = data.get('banner_img') as File;
		let avatar = data.get('avatar_img') as File;

		let uploadedFiles;
		try {
			uploadedFiles = await Promise.all([
				banner.size > 0 ? upload(banner) : undefined,
				avatar.size > 0 ? upload(avatar) : undefined
			]);
		} catch (error: any) {
			console.log('cannot upload image', error);
			return fail(500, {
				error: 'Cannot upload image',
				message: `Cannot upload image`
			});
		}

		const requestData = {
			banner_img: uploadedFiles[0] ? uploadedFiles[0].data.s3_url : undefined,
			avatar_img: uploadedFiles[1] ? uploadedFiles[1].data.s3_url : undefined,
			name: data.get('name')?.toString(),
			bio: data.get('bio')?.toString(),
			email: data.get('email')?.toString(),
			wallet_address: '0xignorethis', // wallet address information is moved to attributes so just set it to empty
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

		const createResponse = await createUser(requestData);

		const responseData = await createResponse.json();

		if (createResponse.status === 200) {
			throw redirect(303, `/crud/users/${responseData.data.id}`);
		} else {
			return fail(responseData.statusCode, responseData);
		}
	}
};
