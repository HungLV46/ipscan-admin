import { config } from '$lib/public-config';

export interface CreateProductRequest {
	name: string;
	owner_id: number;
	avatar_img: string;
	banner_img: string;
	category: string;
	description: string;
	metadata: { previews?: string[]; cta_link?: string };
	featured?: boolean;
	attributes?: { name: string; value: string }[];
	collections?: { chain_id: string; contract_address: string }[];
}

export async function createProduct(data: CreateProductRequest): Promise<Response> {
	return fetch(`${config.apiEndpoint}/products`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
