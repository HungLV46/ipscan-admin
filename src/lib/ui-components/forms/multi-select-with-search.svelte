<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import MultiSelect, { type Option } from 'svelte-multiselect';

	export let labelProps: typeof $$props | undefined = undefined;
	export let multiSelectProps: typeof $$props;
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let items: Option[];
	export let selected: string[] | undefined = undefined;
</script>

<div {...$$restProps}>
	{#if name}
		<Label {...labelProps} {id} class="mb-1 ml-3">{name}</Label>
	{/if}
	<MultiSelect
		{id}
		inputClass={'min-h-10 leading-3 focus:border-primary-500'}
		ulSelectedClass="flex items-center min-h-10 max-h-6"
		options={items}
		bind:selected
		{...multiSelectProps}
	/>
</div>
