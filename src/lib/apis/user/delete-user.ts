import { config } from '$lib/public-config';

export async function deleteUser(id: number): Promise<Response> {
	return fetch(`${config.apiEndpoint}/users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
