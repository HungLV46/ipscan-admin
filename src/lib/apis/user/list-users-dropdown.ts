import { config } from '$lib/public-config';
import type { ListResponse } from '../types';
import type { ListUserQuery } from './list-users';

export interface UserDropdown {
	id: number;
	name: string;
	avatar_img: string;
}

export async function listUsersDropdown(
	variables: undefined | ListUserQuery = { offset: 0, limit: 10 }
): Promise<ListResponse<UserDropdown>> {
	const operationName = 'listUserDropdown';

	const operationsDoc = `
    query ${operationName}($name: String, $limit: Int = 1000, $offset: Int = 0) {
      ipscan_ipscan_user(where: {name: {_ilike: $name}}, limit: $limit, offset: $offset, order_by: {name: asc}) {
        id
        avatar_img
        name
			}
		}
  `;

	return fetch(config.graphqlEndpoint, {
		method: 'POST',
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName
		})
	})
		.then((response) => response.json())
		.then((response) => ({ items: response.data.ipscan_ipscan_user }));
}
