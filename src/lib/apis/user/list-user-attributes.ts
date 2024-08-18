import { config } from '$lib/public-config';
import type { ListResponse } from '../types';

export interface UserAttribute {
	name: string;
	value: string;
}

export async function listUserAttributes(): Promise<ListResponse<UserAttribute>> {
	const operationName = 'listUserAttributes';

	const operationsDoc = `
    query ${operationName} {
			ipscan_user_attributes(distinct_on: [name, value]) {
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
		.then((response) => ({ items: response.data.ipscan_user_attributes }));
}
