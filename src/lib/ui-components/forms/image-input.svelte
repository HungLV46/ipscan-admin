<script lang="ts">
	import { Gallery, Input, Label, type ImgType } from 'flowbite-svelte';
	import _ from 'underscore';

	export let labelProps: typeof $$props | undefined = undefined;
	export let inputProps: typeof $$props | undefined = undefined;
	export let name: string | undefined = undefined;
	export let selectedFiles: ImgType[] = [];

	function handleFileChange(event: Event) {
		const files = (event.target as HTMLInputElement)?.files || [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = (e) => {
					selectedFiles = [...selectedFiles, { src: e.target.result, alt: file.name }];
				};
				reader.readAsDataURL(file);
			}
		}
	}
</script>

<div {...$$restProps}>
	{#if name}
		<Label class="mb-1 ml-3" {...labelProps}>{name}</Label>
	{/if}
	<input type="hidden" name={inputProps?.name} value={JSON.stringify(selectedFiles)} />
	<Input type="file" on:change={handleFileChange} multiple {..._.omit(inputProps, 'name')} />
	<Gallery bind:items={selectedFiles} class="grid-cols-2 gap-4 md:grid-cols-3" />
</div>
