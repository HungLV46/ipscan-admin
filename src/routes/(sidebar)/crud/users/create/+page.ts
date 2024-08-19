import { listUserAttributes } from '$lib/apis/user/list-user-attributes';
import _ from 'underscore';
import type { UserPageData } from '../+page';

export async function load(): Promise<UserPageData> {
	const userAttributes = await listUserAttributes(['tag']);

	const nameToValues = _.groupBy(userAttributes.items, 'name');

	return {
		user: {
			name: '',
			email: '',
			bio: '',
			banner_img: '',
			avatar_img: '',
			additional_info: {
				headline: '',
				location: '',
				socials: []
			},
			attributes: []
		},
		tags: nameToValues['tag']?.map((v) => v.value),
		wallets: []
	};
}
