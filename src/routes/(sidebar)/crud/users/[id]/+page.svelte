<script lang="ts">
	import { PAGE_MODE } from '$lib/constants';
	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import type { UserPageData } from '../+page';
	import UserPage from '../User.svelte';

	export let data: UserPageData;
	export let form: any = undefined;
	export let mode: string = form?.mode || PAGE_MODE.VIEW;

	const path: string = '/crud/users';
	$: description = `A place to ${mode} a single user`;
	$: title = `Admin – Users ${mode}`;
	$: subtitle = `User ${mode}`;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<UserPage {data} bind:mode bind:form />
