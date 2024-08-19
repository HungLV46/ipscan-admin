// import { config } from "$lib/public-config";

import { config } from '$lib/public-config';

export async function upload(file: File) {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(`${config.apiEndpoint}/upload`, {
		method: 'POST',
		body: formData
	});

	return (await response.json()) as { data: { s3_url: string } };
}
