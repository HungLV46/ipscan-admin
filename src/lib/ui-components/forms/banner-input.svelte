<script lang="ts">
	import { Dropzone } from 'flowbite-svelte';
	import { MinusOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { twMerge } from 'tailwind-merge';

	type Src = string | null | undefined;
	export let src: Src;
	export let alt: string | undefined = 'No image available';

	function handleFileChange(event: Event) {
		const files = (event.target as HTMLInputElement)?.files || [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			if (file && file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = (e) => {
					src = e.target?.result as Src;
				};
				reader.readAsDataURL(file);
			}
		}
	}
</script>

<div class={twMerge($$props.class, 'relative')}>
	<Dropzone class="h-56" on:change={handleFileChange} {...$$restProps}>
		{#if src}
			<img {src} alt="banner" />
		{:else}
			<span class="absolute inset-0 flex items-center justify-center text-gray-500">
				{alt}
			</span>
		{/if}
		<!-- a botton showing that we are editing, doesn't do anything more (at least for now) -->
		{#if !$$props.disabled}
			<button
				class="absolute right-3 top-3 h-5 w-5 rounded-full bg-red-300 p-1 text-red-500 hover:bg-red-500 hover:text-white"
				style="line-height: 1.25rem; padding: 0;"
				type="button"
			>
				<PlusOutline />
			</button>
		{/if}
	</Dropzone>
</div>

<style>
	img {
		height: 100%;
		width: 100%;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		object-fit: cover;
	}
</style>
