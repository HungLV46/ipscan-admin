import { config } from '$lib/public-config';

export interface ProductGetResponseData {
	id?: number;
	name: string;
	owner: { id?: number; name?: string };
	avatar_img: string;
	banner_img: string;
	category: string;
	description: string;
	created_at?: string;
	featured_at: string | null;
	attributes: { id: number; name: string; value: string }[];
	metadata: any;
	collections?: { id: number; chain_id: string; contract_address: string }[];
}

export async function getProductById(id: number): Promise<ProductGetResponseData> {
	const operationName = 'ipscanProductById';

	const operationsDoc = `
    query ${operationName}($id: Int!) {
      ipscan_products(where: {id: {_eq: $id}}) {
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
          id
          name
          value
        }
        owner {
          id
          name
        }
        collections: product_collections {
          collection {
            id
            chain_id
            contract_address
          }
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
        ...response.data.ipscan_products[0],
        collections: response.data.ipscan_products[0]?.collections?.map((c: any) => c.collection)
    }});
}
