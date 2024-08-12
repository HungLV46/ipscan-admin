<script lang="ts">
	import Dashboard from '../../../utils/dashboard/Dashboard.svelte';
	import MetaTag from '../../../../lib/ui-components/meta/meta-tags.svelte';
	import Footer from '../../Footer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const path: string = '/layouts/sidebar';
	const description: string = 'Sidebar layout examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - Sidebar Layout';
	const subtitle: string = 'Sidebar Layout';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="p-4">
	<Dashboard {data} />
</main>
<Footer />
