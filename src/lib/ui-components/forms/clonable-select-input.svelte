<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Select from './single-select.svelte';
	import Input from './input.svelte';
	import { MinusOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { twMerge } from 'tailwind-merge';
	import _ from 'underscore';

	export let name: string;
	export let selectProps: typeof $$props;
	export let selectedPath: string;
	export let inputProps: typeof $$props;
	export let inputPath: string;
	export let disabled = false;

	export let items: any[] = [];
</script>

<div class={twMerge('items-center gap-3 space-y-4 sm:flex sm:space-y-0', $$props.class)}>
	<input type="hidden" {name} value={JSON.stringify(items)} />
	<div>
		{#each items as item, index}
			<div class="items-center gap-3 space-y-4 sm:flex sm:space-y-0">
				<Select
					class={twMerge('mb-2 me-4 mt-3 w-48', selectProps?.class)}
					items={selectProps?.items || []}
					bind:selected={items[index][selectedPath]}
					{..._.omit(selectProps, ['class', 'items'])}
					selectProps={{ disabled }}
				/>
				<Input
					class={twMerge('mb-2 me-4 mt-3 w-[30em]', inputProps?.class)}
					bind:value={items[index][inputPath]}
					inputProps={{ disabled }}
					{..._.omit(inputProps, ['class'])}
				>
					{#if !disabled}
						<Button
							type="button"
							size="sm"
							class="ml-3 gap-2"
							on:click={() => {
								items = [...items.slice(0, index), ...items.slice(index + 1, items.length)];
							}}
						>
							<MinusOutline size="sm" />
						</Button>
					{/if}
				</Input>
			</div>
		{/each}
		{#if !disabled}
			<Button
				type="button"
				size="sm"
				class="mt-3 gap-2"
				on:click={() => {
					items = [...items, {}];
				}}
			>
				<PlusOutline size="sm" />Add
			</Button>
		{/if}
	</div>
</div>
