import { deleteUser } from '$lib/apis/user/delete-user';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
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
