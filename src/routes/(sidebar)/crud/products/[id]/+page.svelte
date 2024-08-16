<script lang="ts">
	import { PAGE_MODE } from '$lib/constants';
	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import type { ProductPageData } from '../+page';
	import ProductPage from '../Product.svelte';

	export let data: ProductPageData;
	export let mode: string = data.mode || PAGE_MODE.VIEW;
	export let form: any = undefined;

	const path: string = '/crud/products';
	$: description = `A place to ${mode} a single product`;
	$: title = `Admin – Products ${mode}`;
	$: subtitle = `Product ${mode}`;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<ProductPage {data} {mode} {form} />
