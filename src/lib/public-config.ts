import { env } from '$env/dynamic/public';

export const config = {
	graphqlEndpoint: String(env.PUBLIC_GRAPHQL_ENDPOINT),
	apiEndpoint: String(env.PUBLIC_API_ENDPOINT)
};
