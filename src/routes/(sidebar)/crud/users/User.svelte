<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Button, Card, Heading, Label } from 'flowbite-svelte';
	import { CheckOutline, EditOutline, PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import Delete from './Delete.svelte';

	import Input from '$lib/ui-components/forms/input.svelte';
	import MetaTag from '$lib/ui-components/meta/meta-tags.svelte';
	import BannerInput from '$lib/ui-components/forms/banner-input.svelte';
	import AvatarInput from '$lib/ui-components/forms/avatar-input.svelte';
	import type { UserPageData } from './+page';

	import _ from 'underscore';
	import ClonableInputInput from '$lib/ui-components/forms/clonable-input-input.svelte';
	import { PAGE_MODE } from '$lib/constants';
	import Alert from '$lib/ui-components/views/alert.svelte';
	import MultiSelectWithSearch from '$lib/ui-components/forms/multi-select-with-search.svelte';

	export let data: UserPageData;
	export let form: any;
	export let mode: string = PAGE_MODE.VIEW;

	const path: string = '/crud/users/create';
	$: description = `A place to ${mode} a single user`;
	$: title = `Admin – Users ${mode}`;
	$: subtitle = `Users ${mode}`;

	let openDelete: boolean = false;
	$: isViewMode = mode === PAGE_MODE.VIEW || form?.reload;
	let deleteId: string | undefined = undefined;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<!-- TODO find a more systematical way to reload a page -->
{#if form?.reload}
	{window.location.reload()}
{/if}
<form method="POST" action="?/upsert" enctype="multipart/form-data" use:enhance>
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
				<BreadcrumbItem home href="/crud/users">Users</BreadcrumbItem>
				<BreadcrumbItem>{mode}</BreadcrumbItem>
			</Breadcrumb>
			<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
				Edit user
			</Heading>
			<BannerInput
				name="banner_img"
				src={data.user.banner_img}
				alt="please select a user banner!"
				class="max-w-screen-xl"
				disabled={isViewMode}
			/>
			<Card size="xl" class="w-full">
				<div class="mb-7 flex flex-row">
					<AvatarInput
						name="avatar_img"
						src={data.user.avatar_img}
						alt="please select a user avatar!"
						disabled={isViewMode}
					/>
					<div class="ml-4 flex flex-col space-y-3">
						<Input
							class="w-22 me-4"
							placeholder="User name"
							value={data.user.name}
							inputProps={{ name: 'name', disabled: isViewMode }}
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
									deleteId = data.user.id?.toString();
									openDelete = true;
								}}
								disabled={form?.reload}
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
								<Button
									type="submit"
									size="sm"
									class="w-36 gap-2 px-3"
									color="green"
									disabled={form?.reload}
								>
									<CheckOutline size="sm" /> Save
								</Button>
							{/if}
						{/if}
					</div>
				</div>

				<Card size="xl" class="mt-2 max-w-none shadow-sm">
					<div class="flex flex-row space-y-3">
						<Input
							name="Headline"
							placeholder="humble and handsome"
							class="w-22 mb-2 me-4 mt-3 w-full"
							value={data.user.additional_info?.headline}
							inputProps={{ name: 'headline', disabled: isViewMode }}
						/>
						<MultiSelectWithSearch
							name="Tags/Keywords"
							placeholder="e.g. Play-to-earn, Gaming"
							class="mb-2 me-4 mt-3 w-full"
							items={data.tags}
							selected={data.selected_tags}
							multiSelectProps={{
								name: 'tags',
								allowUserOptions: 'append',
								disabled: isViewMode
							}}
						/>
					</div>
					<Input
						name="About"
						placeholder="e.g. Robert Perez"
						class="w-22 mb-2 me-4 mt-3"
						value={data.user.bio}
						inputProps={{ name: 'bio', disabled: isViewMode }}
					/>
					<Input
						name="Email"
						placeholder="e.g. Robert Perez"
						class="w-22 mb-2 me-4 mt-3"
						value={data.user.email}
						inputProps={{ name: 'email', disabled: isViewMode }}
					/>
					<Input
						name="Location"
						placeholder="e.g. Hanoi, Vietnam"
						class="w-22 mb-2 me-4 mt-3"
						value={data.user.additional_info?.location}
						inputProps={{ name: 'location', disabled: isViewMode }}
					/>
					<Label class="w-22 mb-1 me-4 ml-3 mt-3">Social link(s)</Label>
					<ClonableInputInput
						name="socials"
						items={data.user.additional_info?.socials}
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
					<Label class="w-22 mb-1 me-4 ml-3 mt-3">Wallet Addreses</Label>
					<ClonableInputInput
						name="wallets"
						items={data.wallets}
						inputPropsList={[
							{
								name: 'Address',
								placeholder: 'e.g. 0x000...',
								inputPath: 'address',
								class: 'mb-2 me-4 mt-3 w-[30em]'
							}
						]}
						disabled={isViewMode}
					/>
				</Card>
			</Card>
		</div>
	</main>
</form>

<form method="POST" action="?/delete" use:enhance>
	<input name="deleteId" type="hidden" bind:value={deleteId} />
	<Delete bind:open={openDelete} />
</form>
