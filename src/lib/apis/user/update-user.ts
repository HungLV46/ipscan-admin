import { config } from '$lib/public-config';

export interface UserUpdateRequest {
	name?: string;
	email?: string;
	bio?: string;
	banner_img?: string;
	avatar_img?: string;
	additional_info?: {
		headline?: string;
		location?: string;
		socials?: { name: string; url: string }[];
		wallets: { address: string }[];
	};
	attributes?: { name: string; value: string }[];
}

export async function updateUser(id: number, data: UserUpdateRequest): Promise<Response> {
	return fetch(`${config.apiEndpoint}/users/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
