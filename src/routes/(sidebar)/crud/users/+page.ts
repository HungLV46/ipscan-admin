import type { ListWithPagingResponse } from '$lib/apis/types.js';
import * as _ from 'underscore';

import { listUser, type UserResponse } from '$lib/apis/user/list-users';
import type { UserGetResponseData } from '$lib/apis/user/get-user';

export interface UserPageData {
	user: UserGetResponseData;
	tags: string[];
	selected_tags?: string[];
	wallets?: { address: string }[];
}

export async function load(): Promise<ListWithPagingResponse<UserResponse>> {
	return listUser();
}
