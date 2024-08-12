import { env } from '$env/dynamic/public';
import { config } from '$lib/public-config';

export interface CreateProductRequest {
	name: string;
	category: string;
	description: string;
	avatar_img: string;
	banner_img: string;
	metadata: any;
	owner: { id: number };
	featured_at: string | null;
	attributes: { name: string; value: string }[];
	collections?: { chain_id: string; contract_address: string }[];
}

export async function createProduct(data: CreateProductRequest): Promise<void> {
	await fetch(`${config.apiEndpoint}/products`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
