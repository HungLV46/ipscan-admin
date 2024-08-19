import { config } from '$lib/public-config';

export async function deleteProduct(id: number): Promise<Response> {
	return fetch(`${config.apiEndpoint}/products/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
