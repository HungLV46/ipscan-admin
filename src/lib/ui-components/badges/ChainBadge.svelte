<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { BadgeProps } from 'flowbite-svelte/Badge.svelte';

	export let chainName: string;
	export let dark: boolean = false;

	const chains: Record<string, string> = {
		'Aura network': 'Aura network',
		Ethereum: 'Ethereum',
		'Arbitrum One': 'Arbitrum One',
		'Avalanche C-Chain': 'Avalanche C-Chain'
	};

	const colors: Record<string, BadgeProps['color']> = {
		'Aura network': 'green',
		Ethereum: 'red',
		'Arbitrum One': 'yellow',
		'Avalanche C-Chain': 'purple'
	};
</script>

<Badge color={colors[chainName] ?? 'dark'} border={dark}>{chains[chainName] ?? 'Unknown'}</Badge>
