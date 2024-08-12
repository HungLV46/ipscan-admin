<script lang="ts">
	import { PAGE_MODE } from '$lib/constants';
	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import type { ProductPageData } from '../+page';
	import ProductPage from '../Product.svelte';

	export let data: ProductPageData;
	export let mode: string = PAGE_MODE.CREATE;

	const path: string = '/crud/products';
	$: description = `A place to create a single product`;
	$: title = `Admin – Product create`;
	$: subtitle = `Products create`;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<ProductPage {data} {mode} />
