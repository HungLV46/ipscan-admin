<script lang="ts">
	import { PAGE_MODE } from '$lib/constants';
	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import type { UserPageData } from '../+page';
	import UserPage from '../User.svelte';

	export let data: UserPageData;
	export let mode: string = PAGE_MODE.CREATE;
	export let form: any = undefined;

	const path: string = '/crud/users';
	$: description = `A place to create a single user`;
	$: title = `Admin – User create`;
	$: subtitle = `Users create`;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<UserPage {data} bind:mode bind:form />
