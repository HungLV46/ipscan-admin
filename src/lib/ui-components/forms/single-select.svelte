<script lang="ts">
	import { Label, Select, type SelectOptionType } from 'flowbite-svelte';

	export let selectProps: typeof $$props | undefined = undefined;
	export let name: string | undefined = undefined;
	export let items: SelectOptionType<string>[];
	export let selected: string;
</script>

<div class={$$props.class}>
	{#if name}
		<Label class="mb-1 ml-3">{name}</Label>
	{/if}
	<Select {items} bind:value={selected} on:input {...selectProps} />
</div>
