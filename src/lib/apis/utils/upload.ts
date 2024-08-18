// import { config } from "$lib/public-config";

export async function upload(file: File) {
	const formData = new FormData();
	formData.append('file', file);

	// TODO use config
	// const response = await fetch(`${config.apiEndpoint}/upload`, {
	const response = await fetch(`http://localhost:3000/upload`, {
		method: 'POST',
		body: formData
	});

	return (await response.json()) as { data: { s3_url: string } };
}
