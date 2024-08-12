<script lang="ts">
	import { Pagination } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import _ from 'underscore';
	import { range } from 'underscore';

	type Paging = { total: number; limit: number; offset: number };
	export let paging: Paging;
	export let maxDisplayPages: number = 10;

	function generatePages(_paging: Paging = paging) {
		let currentPage = Math.floor(_paging.offset / _paging.limit) + 1;
		let startPage = currentPage - (currentPage % maxDisplayPages || maxDisplayPages) + 1;
		let maxPosibblePages = paging.total === 0 ? 0 : Math.ceil(paging.total / paging.limit);
		let endPage = Math.min(startPage + maxDisplayPages, maxPosibblePages + 1); // exclusive end

		return range(startPage, endPage).map((pageNumber: number) => ({
			name: pageNumber.toString(),
			active: pageNumber === currentPage
		}));
	}
	$: pages = generatePages(paging);

	const dispactch = createEventDispatcher();
	const dispatchPageUpdateEvent = () => dispactch('pageUpdate', _.omit(paging, 'total'));

	$: prevPossible = paging.offset - paging.limit >= 0;
	const previous = async () => {
		if (prevPossible) {
			paging.offset -= paging.limit;
			pages = generatePages(); // TODO - could be more efficient
			dispatchPageUpdateEvent();
		}
	};

	$: nextPossible = paging.offset + paging.limit < paging.total;
	const next = async () => {
		if (nextPossible) {
			paging.offset += paging.limit;
			pages = generatePages(); // TODO - could be more efficient
			dispatchPageUpdateEvent();
		}
	};

	const click = async (event: MouseEvent) => {
		paging.offset = (parseInt((event.target as HTMLElement).innerText) - 1) * paging.limit;
		pages = generatePages(); // TODO - could be more efficient
		dispatchPageUpdateEvent();
	};
</script>

<Pagination {pages} on:previous={previous} on:next={next} on:click={click} {...$$restProps}>
	<svelte:fragment slot="prev">
		{#if prevPossible}
			<ChevronLeftOutline class="h-6 w-6" />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="next">
		{#if nextPossible}
			<ChevronRightOutline class="h-6 w-6" />
		{/if}
	</svelte:fragment>
</Pagination>
