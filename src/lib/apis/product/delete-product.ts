import { env } from '$env/dynamic/public';
import { config } from '$lib/public-config';

export interface ProductUpdateRequest {
	id: number;
	name: string;
	category: string;
	description: string;
	avatar_img: string;
	banner_img: string;
	metadata: any;
	owner_id?: number; // TODO required
	featured_at: string | null;
	product_attributes: { id?: number; name: string; value: string }[];

	collections?: { id?: number; chain_id: string; contract_address: string }[];
}

export async function updateProduct(id: number): Promise<void> {
	await fetch(`${config}/products/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	});
}
