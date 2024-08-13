<script lang="ts">
	import type { PageData } from './$types';
	import MetaTag from '../../lib/ui-components/meta/meta-tags.svelte';

	const path: string = '';
	const description: string = 'Admin Dashboard example using Flowbite Svelte';
	const title: string = 'Flowbite Svelte Admin Dashboard - Home';
	const subtitle: string = 'Admin Dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />
<main class="p-4">
	<div></div>
</main>
