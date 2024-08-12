import { config } from '$lib/public-config';
import type { ListWithPagingResponse } from '../types';

export interface ListProductQuery {
	name?: string;
	category?: string;
	order_by?: { [key: string]: 'asc' | 'desc' };
	limit: number;
	offset: number;
}

export interface ProductResponseData {
	id: string;
	name: string;
	owner: { name: string };
	avatar_img: string;
	category: string;
	description: string;
	created_at: string;
	featured_at: string;
	attributes: [{ name: string; value: string }];
}

export async function listProduct(
	variables: undefined | ListProductQuery = { offset: 0, limit: 10 }
): Promise<ListWithPagingResponse<ProductResponseData>> {
	const operationName = 'ipscanListProducts';

	const operationsDoc = `
    query ${operationName}($name: String, $category: String, $order_by: [products_order_by!] = {created_at: desc}, $limit: Int, $offset: Int) {
      ipscan_products(where: {name: {_ilike: $name}, category: {_eq: $category}}, order_by: $order_by, limit: $limit, offset: $offset) {
        avatar_img
        banner_img
        category
        created_at
        description
        featured_at
        id
        metadata
        name
        stat_floor_price_12m
        stat_floor_price_30d
        stat_floor_price_7d
        stat_floor_price_all
        stat_total_activities
        stat_total_collection
        stat_total_items
        stat_total_volume_12m
        stat_total_volume_30d
        stat_total_volume_7d
        stat_total_volume_all
        attributes {
          name
          value
        }
        owner {
          name
        }
      }
      ipscan_products_aggregate(where: {name: {_ilike: $name}, category: {_eq: $category}}) {
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
		.then((response) => ({
			items: response.data.ipscan_products,
			paging: {
				total: parseInt(response.data.ipscan_products_aggregate.aggregate.count),
				limit: variables.limit,
				offset: variables.offset
			}
		}));
}
