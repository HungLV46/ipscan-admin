import { deleteUser } from '$lib/apis/user/delete-user';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ request }) => {
		const id = (await request.formData()).get('deleteId')?.toString();

		console.log('id', id);

		if (!id) return fail(400, { missingId: true });

		const response = await deleteUser(parseInt(id));

		console.log(await response.json());

		if (response.status === 200) {
			throw redirect(303, '/crud/users');
		}
	}
};
