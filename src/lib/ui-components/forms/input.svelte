<script lang="ts">
	import { Label, Helper, Input } from 'flowbite-svelte';
	import _ from 'underscore';

	type InputState = 'default' | 'disabled' | 'invalid' | 'valid';
	type Color = 'gray' | 'red' | 'green' | 'disabled' | undefined;

	export let labelProps: typeof $$props | undefined = undefined;
	export let inputProps: typeof $$props | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let validate: undefined | ((value: string | undefined) => void) = undefined;
	export let state: InputState = 'default';
	export let helperText: string | undefined = undefined;

	let stateToColor = {
		default: undefined,
		disabled: 'gray',
		invalid: 'red',
		valid: 'green'
	};
	$: color = stateToColor[state] as Color;

	let error: string;
	// change input state based on validate function
	function _validate() {
		if (!validate) return;

		try {
			validate(value);
			state = 'valid';
		} catch (error: any) {
			state = 'invalid';
			error = error.message;
		}
	}
</script>

<div {...$$restProps}>
	{#if name}
		<Label class="mb-1 ml-3" {...labelProps} {color}>{name}</Label>
	{/if}
	<div class="flex flex-row">
		<Input
			on:change={_validate}
			disabled={state === 'disabled' || inputProps?.disabled}
			bind:value
			{...inputProps}
		/>
		<slot />
	</div>
	{#if state == 'invalid'}
		<Helper class="ml-3 mt-1" color="red">{@html error}</Helper>
	{:else if helperText}
		<Helper class="ml-3 mt-1" {color}>{@html helperText}</Helper>
	{/if}
</div>
