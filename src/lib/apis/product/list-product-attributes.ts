import { config } from '$lib/public-config';
import type { ListResponse } from '../types';

export interface ProductAttribute {
	name: string;
	value: string;
}

export async function listProductAttributes(): Promise<ListResponse<ProductAttribute>> {
	const operationName = 'listProductAttributes';

	const operationsDoc = `
    query ${operationName} {
			ipscan_product_attributes(distinct_on: [name, value]) {
				name
				value
			}
		}
  `;

	return fetch(config.graphqlEndpoint, {
		method: 'POST',
		body: JSON.stringify({
			query: operationsDoc,
			variables: {},
			operationName: operationName
		})
	})
		.then((response) => response.json())
		.then((response) => ({ items: response.data.ipscan_product_attributes }));
}
