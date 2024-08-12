import { config } from '$lib/public-config';

export interface ProductUpdateRequest {
	id: number;
	name: string;
	category: string;
	description: string;
	avatar_img: string;
	banner_img: string;
	metadata: any;
	owner: { id: string };
	featured_at: string | null;
	attributes: { name: string; value: string }[];
	collections?: { chain_id: string; contract_address: string }[];
}

export async function updateProduct(data: ProductUpdateRequest): Promise<void> {
	await fetch(`${config.apiEndpoint}/products/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
