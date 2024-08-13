<script lang="ts">
	import {
		Avatar,
		Badge,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Heading
	} from 'flowbite-svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
	import { TableHeadCell, Toolbar, ToolbarButton } from 'flowbite-svelte';
	import { FilterSolid, SearchSolid } from 'flowbite-svelte-icons';
	import { EditOutline, PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';

	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import ChainBadge from '$lib/ui-components/badges/ChainBadge.svelte';
	import Pagination from '$lib/ui-components/views/pagination.svelte';
	import {
		listProduct,
		type ListProductQuery,
		type ProductResponseData
	} from '$lib/apis/product/list-products';
	import Input from '$lib/ui-components/forms/input.svelte';

	import _ from 'underscore';
	import Delete from './Delete.svelte';
	import type { ListWithPagingResponse } from '$lib/apis/types';

	const path: string = '/crud/products';
	const description: string = 'A place to create product';
	const title: string = 'Admin – Products list';
	const subtitle: string = 'Products list';

	export let data: ListWithPagingResponse<ProductResponseData>;
	const extractChainNames = (product: ProductResponseData) =>
		product.attributes.filter((att) => att.name === 'Chain').map((att) => att.value);

	let searchConditions: ListProductQuery = _.omit(data.paging, 'total');
	async function handleSearch(pageQuery?: { limit: number; offset: number }) {
		data = await listProduct({
			...searchConditions,
			...pageQuery,
			name: `%${searchConditions?.name || ''}%`
		});
	}

	let openDelete: boolean = false;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home href="/crud/products">Products</BreadcrumbItem>
			<BreadcrumbItem>List</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			All products
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
			<Input
				inputProps={{ placeholder: 'Search for products' }}
				class="w- me-4 xl:w-96"
				bind:value={searchConditions.name}
			/>
			<!-- Search section -->
			<div class="border-l border-gray-100 pl-2 dark:border-gray-700">
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<FilterSolid size="lg" />
				</ToolbarButton>
				<Button
					pill={true}
					outline={true}
					class="!p-2"
					size="xl"
					on:click={() => {
						handleSearch();
					}}
				>
					<SearchSolid size="lg" />
				</Button>
			</div>
			<div slot="end" class="flex items-center space-x-2">
				<Button size="sm" class="mr-10 gap-2 whitespace-nowrap px-3" href={`${path}/create`}>
					<PlusOutline size="sm" />Add product
				</Button>
			</div>
		</Toolbar>
	</div>

	<!-- Product data section -->
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
			{#each ['Name', 'Type', 'Chain', 'Creator', 'Featured', 'Actions'] as title}
				<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
			{/each}
		</TableHead>

		<TableBody>
			{#each data.items as product}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>

					<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
						<Avatar src={product.avatar_img} />
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">
								{product.name}
							</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
								{product.description.length > 30
									? product.description.substring(0, 30) + '...'
									: product.description}
							</div>
						</div>
					</TableBodyCell>

					<TableBodyCell
						class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
					>
						{product.category}
					</TableBodyCell>

					<TableBodyCell class="p-4">
						{#each extractChainNames(product) as chainName, index}
							<ChainBadge {chainName} />
							<!-- new line for each 2 chains-->
							{#if index % 2 === 1}
								<br />
							{/if}
						{/each}
					</TableBodyCell>

					<TableBodyCell class="p-4">{product.owner.name}</TableBodyCell>
					<TableBodyCell class="p-4 font-normal">
						<div class="flex items-center gap-2">
							{#if product.featured_at !== null}
								<Badge color="green">Featured</Badge>
							{:else}
								<Badge color="red">Not featured</Badge>
							{/if}
						</div>
					</TableBodyCell>
					<TableBodyCell class="space-x-2 p-4">
						<Button size="sm" class="gap-2 px-3" href="/crud/products/{product.id}?mode=edit">
							<EditOutline size="sm" /> Edit
						</Button>
						<Button color="red" size="sm" class="gap-2 px-3">
							<TrashBinSolid size="sm" /> Delete
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</main>

<Pagination
	class="flex justify-end pr-4 pt-4"
	bind:paging={data.paging}
	on:pageUpdate={(event) => {
		handleSearch(event.detail);
	}}
/>

<Delete bind:open={openDelete} />
