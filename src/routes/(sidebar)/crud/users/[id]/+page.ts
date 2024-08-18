import { getUserById } from '$lib/apis/user/get-user';
import { listUserAttributes } from '$lib/apis/user/list-user-attributes';
import _ from 'underscore';
import type { UserPageData } from '../+page';

export async function load(pageLoadEvent): Promise<UserPageData> {
	const [user, userAttributes] = await Promise.all([
		getUserById(parseInt(pageLoadEvent.params.id)),
		listUserAttributes()
	]);

	const nameToValues = _.groupBy(userAttributes.items, 'name');
	const selectedNameToValues = _.groupBy(user.attributes, 'name');

	return {
		user,
		tags: nameToValues['tag']?.map((v) => v.value),
		selected_tags: selectedNameToValues['tag']?.map((v) => v.value)
	};
}
