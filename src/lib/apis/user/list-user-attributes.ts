import { config } from '$lib/public-config';
import type { ListResponse } from '../types';

export interface UserAttribute {
	name: string;
	value: string;
}

export async function listUserAttributes(
	includeNames: string[]
): Promise<ListResponse<UserAttribute>> {
	const operationName = 'listUserAttributes';

	const operationsDoc = `
    query ${operationName}($names: [String!] = "") {
			ipscan_user_attributes(distinct_on: [name, value], where: {name: {_in: $names}}) {
				name
				value
			}
		}
  `;

	return fetch(config.graphqlEndpoint, {
		method: 'POST',
		body: JSON.stringify({
			query: operationsDoc,
			variables: { names: includeNames },
			operationName: operationName
		})
	})
		.then((response) => response.json())
		.then((response) => ({ items: response.data.ipscan_user_attributes }));
}
