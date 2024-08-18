import { config } from '$lib/public-config';
import type { ListWithPagingResponse } from '../types';

export interface ListUserQuery {
	name?: string;
	order_by?: { [key: string]: 'asc' | 'desc' };
	limit: number;
	offset: number;
}

export interface UserResponse {
	id: number;
	name: string;
	avatar_img: string;
	no_products: number;
	no_collections: number;
	no_nfts: number;
}

export async function listUser(
	variables: undefined | ListUserQuery = { offset: 0, limit: 10 }
): Promise<ListWithPagingResponse<UserResponse>> {
	const operationName = 'ipscanListCreators';

	console.log(variables);

	// TODO check query performance
	const operationsDoc = `
    query ${operationName}($name: String, $limit: Int = 10, $offset: Int = 0) {
      ipscan_ipscan_user(where: {name: {_ilike: $name}}, limit: $limit, offset: $offset) {
        id
        avatar_img
        name
        products_aggregate {
          aggregate {
            count
          }
        }
        products {
          product_collections_aggregate {
            aggregate {
              count
            }
          }
          product_collections {
            collection {
              nfts_aggregate {
                aggregate {
                  count
                }
              }
            }
          }
        }
      }
      ipscan_ipscan_user_aggregate(where: {name: {_ilike: $name}}) {
        aggregate {
          count
        }
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
		.then((response) => {
			console.log('response', response);
			const items = [];
			// sum all number of collections & nfts
			for (const user of response.data.ipscan_ipscan_user) {
				const item = {
					id: user.id,
					avatar_img: user.avatar_img,
					name: user.name,
					no_products: user.products_aggregate.aggregate.count,
					no_collections: 0,
					no_nfts: 0
				};

				for (const product of user.products) {
					item.no_collections += product.product_collections_aggregate.aggregate.count;

					for (const collection of product.product_collections) {
						item.no_nfts += collection.collection.nfts_aggregate.aggregate.count;
					}
				}

				items.push(item);
			}

			return {
				items: items,
				paging: {
					total: parseInt(response.data.ipscan_ipscan_user_aggregate.aggregate.count),
					limit: variables.limit,
					offset: variables.offset
				}
			};
		});
}
