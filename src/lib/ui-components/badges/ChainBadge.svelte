<script lang="ts">
	import { CHAINS } from '$lib/constants';
	import { Badge } from 'flowbite-svelte';
	import type { BadgeProps } from 'flowbite-svelte/Badge.svelte';

	export let chainId: string;
	export let dark: boolean = false;

	const colors: Record<string, BadgeProps['color']> = {
		'6322': 'green',
		'1': 'red',
		'11155111': 'yellow'
	};

	console.log(chainId);
</script>

<Badge color={colors[chainId] ?? 'dark'} border={dark}>{CHAINS[chainId] ?? 'Unknown'}</Badge>
