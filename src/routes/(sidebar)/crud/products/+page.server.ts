import { deleteProduct } from '$lib/apis/product/delete-product';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
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
