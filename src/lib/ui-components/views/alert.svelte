<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	const typesToColor = {
		info: 'blue',
		warning: 'yellow',
		success: 'green',
		error: 'red'
	};
	type Type = keyof typeof typesToColor;
	type Color = 'blue' | 'yellow' | 'green' | 'red' | undefined;

	export let type: Type = 'info';
	export let description: string = 'Alert description';

	const color = typesToColor[type] as Color;
</script>

<Alert
	class={twMerge('fixed left-[60%] z-20 translate-x-[-50%]', $$props.class)}
	{color}
	dismissable
	{...$$restProps}>{description}</Alert
>
