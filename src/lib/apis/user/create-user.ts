import { config } from '$lib/public-config';

export interface UserCreateRequest {
	name?: string;
	email?: string;
	bio?: string;
	wallet_address?: string;
	banner_img?: string;
	avatar_img?: string;
	additional_info?: {
		headline?: string;
		location?: string;
		socials?: { name: string; url: string }[];
		wallets?: { address: string }[];
	};
	attributes?: { name: string; value: string }[];
}

export async function createUser(data: UserCreateRequest): Promise<Response> {
	return fetch(`${config.apiEndpoint}/users`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
