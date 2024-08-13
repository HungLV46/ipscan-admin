import { error, NumericRange } from '@sveltejs/kit';

export function load({ params }) {
	const status = +params.code;

	if (isNaN(status) || status < 400 || status > 599) {
		return error(500, 'Wrong code');
	} else {
		const code = status as NumericRange<400,599>;
		error(code, 'Not found');
	}
}
