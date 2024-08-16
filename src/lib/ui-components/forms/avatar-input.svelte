<script lang="ts">
	import { Dropzone } from 'flowbite-svelte';
	import { MinusOutline } from 'flowbite-svelte-icons';

	type Src = string | null | undefined;
	export let src: Src = undefined;
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

<div class="relative">
	<Dropzone
		{...$$restProps}
		class="relative h-32 w-32"
		on:change={handleFileChange}
		on:click={(event) => console.log(event)}
	>
		{#if src}
			<img {src} alt="avatar" />
		{:else}
			<span class="absolute inset-0 flex items-center justify-center text-gray-500">
				{alt}
			</span>
		{/if}
		<!-- little close button to remove the -->
		{#if !$$props.disabled}
			<button
				class="absolute right-3 top-3 h-5 w-5 rounded-full bg-red-300 p-1 text-red-500 hover:bg-red-500 hover:text-white"
				style="line-height: 1.25rem; padding: 0;"
				type="button"
				on:click={(event) => {
					src = undefined;
					event.stopPropagation();
				}}
			>
				<MinusOutline />
			</button>
		{/if}
	</Dropzone>
</div>

<style>
	img {
		height: 100%;
		width: 100%;
		border-radius: 0.5rem;
		object-fit: cover;
	}
	img[style*='height'] {
		max-height: unset;
	}
</style>
