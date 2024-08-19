import { config } from '$lib/public-config';

export interface UserGetResponseData {
	id?: number;
	name?: string;
	email?: string;
	bio?: string;
	banner_img?: string;
	avatar_img?: string;
	additional_info?: {
		headline?: string;
		location?: string;
		socials?: { name: string; url: string }[];
	};
	attributes?: { name: string; value: string }[];
}

export async function getUserById(id: number): Promise<UserGetResponseData> {
	const operationName = 'getUserById';

	const operationsDoc = `
    query ${operationName}($id: Int = 13) {
			ipscan_ipscan_user(where: {id: {_eq: $id}}) {
				id
				name
				email
				bio
				banner_img
				avatar_img
				additional_info
				attributes {
					name
					value
				}
			}
		}
  `;

	return fetch(config.graphqlEndpoint, {
		method: 'POST',
		body: JSON.stringify({
			query: operationsDoc,
			variables: { id: id },
			operationName: operationName
		})
	})
		.then((response) => response.json())
		.then((response) => {
			return {
				...response.data.ipscan_ipscan_user[0]
			};
		});
}
