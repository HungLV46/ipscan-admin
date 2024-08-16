<script lang="ts">
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Card,
		Heading,
		Label,
		Toggle
	} from 'flowbite-svelte';
	import { CheckOutline, EditOutline, PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import Delete from './Delete.svelte';

	import Input from '$lib/ui-components/forms/input.svelte';
	import Textarea from '$lib/ui-components/forms/text-area.svelte';
	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import MultiSelectWithSearch from '$lib/ui-components/forms/multi-select-with-search.svelte';
	import Select from '$lib/ui-components/forms/single-select.svelte';
	import ImageInput from '$lib/ui-components/forms/image-input.svelte';
	import BannerInput from '$lib/ui-components/forms/banner-input.svelte';
	import AvatarInput from '$lib/ui-components/forms/avatar-input.svelte';
	import type { ProductPageData } from './+page';

	import _ from 'underscore';
	import ClonableSelectInput from '$lib/ui-components/forms/clonable-select-input.svelte';
	import ClonableInputInput from '$lib/ui-components/forms/clonable-input-input.svelte';
	import { CHAINS, PAGE_MODE, PRODUCT_CATEGORIES } from '$lib/constants';
	import Alert from '$lib/ui-components/views/alert.svelte';

	export let data: ProductPageData;
	export let form: any;
	export let mode: string = PAGE_MODE.VIEW;

	const path: string = '/crud/products/create';
	$: description = `A place to ${mode} a single product`;
	$: title = `Admin – Products ${mode}`;
	$: subtitle = `Products ${mode}`;

	let openDelete: boolean = false;
	$: isViewMode = mode === PAGE_MODE.VIEW || form?.reload;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<!-- TODO find a more systematical way to reload a page -->
{#if form?.reload}
	{window.location.reload()}
{/if}
<form method="POST" enctype="multipart/form-data" use:enhance>
	<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
		<div class="mt-10 p-4">
			{#if form?.error}
				<Alert
					class="fixed left-[60%] z-20 translate-x-[-50%]"
					type="error"
					description={form.message}
				/>
			{/if}
			<Breadcrumb class="mb-5">
				<BreadcrumbItem home href="/crud/products">Products</BreadcrumbItem>
				<BreadcrumbItem>{mode}</BreadcrumbItem>
			</Breadcrumb>
			<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
				Edit product
			</Heading>
			<BannerInput
				name="banner_img"
				src={data.product.banner_img}
				alt="please select a product banner!"
				class="max-w-screen-xl"
				disabled={isViewMode}
			/>
			<Card size="xl" class="w-full">
				<div class="mb-7 flex flex-row">
					<AvatarInput
						name="avatar_img"
						src={data.product.avatar_img}
						alt="please select a product avatar!"
						disabled={isViewMode}
					/>
					<div class="ml-4 flex flex-col space-y-3">
						<Input
							class="w-22 me-4"
							placeholder="Product name"
							value={data.product.name}
							inputProps={{ name: 'name', disabled: isViewMode }}
						/>
						<Toggle
							name="featured"
							class="me-4"
							size="small"
							color="blue"
							checked={!_.isEmpty(data.product.featured_at)}
							disabled={isViewMode}
						>
							Featured
						</Toggle>
						<Select
							class="w-22 me-4"
							items={PRODUCT_CATEGORIES.map((c) => ({ name: c, value: c }))}
							selected={data.product.category || ''}
							selectProps={{
								name: 'category',
								disabled: isViewMode
							}}
						/>
					</div>
					<div class="mb-auto ml-auto justify-center space-x-2">
						{#if mode === PAGE_MODE.CREATE}
							<Button type="submit" size="sm" class="mr-10 w-36 gap-2 px-3" color="green">
								<PlusOutline size="sm" /> Add
							</Button>
						{:else}
							<Button
								color="red"
								size="sm"
								class="w-36 gap-2 px-3"
								on:click={() => {
									openDelete = true;
								}}
							>
								<TrashBinSolid size="sm" /> Delete
							</Button>
							{#if mode === PAGE_MODE.VIEW}
								<Button
									size="sm"
									class="w-36 gap-2 px-3"
									color="green"
									on:click={() => (mode = PAGE_MODE.EDIT)}
								>
									<EditOutline size="sm" /> Edit
								</Button>
							{:else}
								<Button type="submit" size="sm" class="w-36 gap-2 px-3" color="green">
									<CheckOutline size="sm" /> Save
								</Button>
							{/if}
						{/if}
					</div>
				</div>

				<Card size="xl" class="max-w-none shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">On-chain Info</h3>
					</div>
					<Label>Link Collection(s)</Label>
					<ClonableSelectInput
						name="collections"
						items={data.product.collections || []}
						selectProps={{
							name: 'Chain',
							class: 'mb-2 me-4 mt-3 w-48',
							items: Object.keys(CHAINS).map((id) => ({
								name: CHAINS[id],
								value: id
							}))
						}}
						selectedPath="chain_id"
						inputProps={{
							name: 'Contract address',
							placeholder: 'e.g. 0x00000000...'
						}}
						inputPath="contract_address"
						disabled={isViewMode}
					/>
				</Card>

				<Card size="xl" class="mt-2 max-w-none shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Off-chain info</h3>
					</div>
					<Textarea
						name="About"
						placeholder="Product description"
						class="w-22 mb-2 me-4 mt-3 w-full"
						value={data.product.description}
						textareaProps={{ name: 'about', disabled: isViewMode }}
					/>
					<Input
						name="Creator"
						placeholder="e.g. Robert Perez"
						class="w-22 mb-2 me-4 mt-3"
						value={data.product.owner?.name}
						inputProps={{ name: 'creator', disabled: isViewMode }}
					/>
					<ImageInput
						name="Overview pictures/media"
						selectedFiles={data.product.metadata?.previews?.map((p) => ({ src: p }))}
						inputProps={{ name: 'previews', disabled: isViewMode }}
					/>
					<Input
						name="CTA link"
						placeholder="Call to action link"
						class="w-22 mb-2 me-4 mt-3"
						value={data.product.metadata?.cta_url}
						inputProps={{ name: 'cta_url', disabled: isViewMode }}
					/>
					<ClonableInputInput
						name="socials"
						items={data.product.metadata?.socials}
						inputPropsList={[
							{
								name: 'Social',
								placeholder: 'e.g. Discord',
								inputPath: 'name',
								class: 'mb-2 me-4 mt-3 w-48'
							},
							{
								name: 'Url',
								placeholder: 'e.g. https://www.example.com',
								inputPath: 'url'
							}
						]}
						disabled={isViewMode}
					/>
				</Card>

				<Card size="xl" class="mt-2 max-w-none shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Type-Specific</h3>
					</div>
					<MultiSelectWithSearch
						name="Status"
						placeholder="e.g. Ethereum"
						class="mb-2 me-4 mt-3 w-full"
						items={data.statuses}
						selected={data.selected_statuses}
						multiSelectProps={{
							name: 'statuses',
							allowUserOptions: 'append',
							disabled: isViewMode
						}}
					/>
					<MultiSelectWithSearch
						name="Player info"
						placeholder="e.g. Ethereum"
						class="mb-2 me-4 mt-3 w-full"
						items={data.player_supports}
						selected={data.selected_player_supports}
						multiSelectProps={{
							name: 'players_infos',
							allowUserOptions: 'append',
							disabled: isViewMode
						}}
					/>
					<MultiSelectWithSearch
						name="Genre"
						placeholder="e.g. Ethereum"
						class="mb-2 me-4 mt-3 w-full"
						items={data.genres}
						selected={data.selected_genres}
						multiSelectProps={{ name: 'genres', allowUserOptions: 'append', disabled: isViewMode }}
					/>
					<MultiSelectWithSearch
						name="Game mode"
						placeholder="e.g. Ethereum"
						class="mb-2 me-4 mt-3 w-full"
						items={data.game_modes}
						selected={data.selected_game_modes}
						multiSelectProps={{
							name: 'game_modes',
							allowUserOptions: 'append',
							disabled: isViewMode
						}}
					/>
				</Card>
			</Card>
		</div>
	</main>
</form>

<Delete bind:open={openDelete} />
