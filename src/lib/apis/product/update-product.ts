import { config } from '$lib/public-config';

export interface ProductUpdateRequest {
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

export async function updateProduct(id: number, data: ProductUpdateRequest): Promise<Response> {
	return fetch(`${config.apiEndpoint}/products/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
