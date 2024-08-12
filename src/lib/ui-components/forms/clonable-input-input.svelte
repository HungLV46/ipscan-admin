<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Input from './input.svelte';
	import { MinusOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { twMerge } from 'tailwind-merge';
	import _ from 'underscore';

	export let name: string;
	export let inputPropsList: (typeof $$props)[];
	export let disabled = false;

	export let items: any[] = [];
	let lastInputProps: typeof $$props = inputPropsList[inputPropsList.length - 1];
</script>

<div class={twMerge('items-center gap-3 space-y-4 sm:flex sm:space-y-0', $$props.class)}>
	<input type="hidden" {name} value={JSON.stringify(items)} />
	<div>
		{#each items as item, i}
			<div class="items-center gap-3 space-y-4 sm:flex sm:space-y-0">
				{#each inputPropsList.slice(0, inputPropsList.length - 1) as inputProps, j}
					<Input
						class={twMerge('mb-2 me-4 mt-3 w-[30em]', inputProps?.class)}
						bind:value={items[i][inputProps.inputPath]}
						inputProps={{ disabled }}
						{..._.omit(inputProps, ['class', 'inputPath'])}
					/>
				{/each}
				<Input
					class={twMerge('mb-2 me-4 mt-3 w-[30em]', lastInputProps.class)}
					bind:value={items[i][lastInputProps.inputPath]}
					inputProps={{ disabled }}
					{..._.omit(lastInputProps, ['class', 'inputPath'])}
				>
					{#if !disabled}
						<Button
							type="button"
							size="sm"
							class="ml-3 gap-2"
							on:click={() => {
								items = [...items.slice(0, i), ...items.slice(i + 1, items.length)];
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
