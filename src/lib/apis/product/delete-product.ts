import { config } from '$lib/public-config';

export async function deleteProduct(id: number): Promise<void> {
	await fetch(`${config}/products/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
