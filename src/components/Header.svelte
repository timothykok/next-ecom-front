<script>
	import '../app.css';
	import { authenticateUser, isLoggedIn, logOut } from '../utils/auth';
	import Themes from '../components/Themes.svelte';
	import { themeChange } from 'theme-change';
	import { goto } from '$app/navigation';

	function logDirect() {
		goto('/users/sign-in');
	}
</script>

<div class="header" style="padding:1.5em">
	<div class="float-right flex flex-row gap-2 align-middle">
		<div>
			{#if $isLoggedIn}
				<button
					on:click={logOut}
					class="text- bg-transparent-700 hover:bg-gray-300 hover:text-yellow-950 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-transparent-600 dark:hover:bg-transparent-700 focus:outline-none dark:focus:ring-transparent-800"
					>Log Out
				</button>
			{:else}
				<button
					on:click={logDirect}
					class="text- bg-transparent-700 hover:bg-gray-300 hover:text-yellow-950 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-transparent-600 dark:hover:bg-transparent-700 focus:outline-none dark:focus:ring-transparent-800"
					>Log In</button
				>
			{/if}
		</div>
		<div>
			<Themes></Themes>
		</div>
	</div>

	<div class="left" style="float:left">
		<a
			href="/"
			class="font-bold bg-transparent-900 hover:bg-transparent-800 font-large rounded-lg text-2xl px-5 py-2.5 mr-2 mb-2 dark:bg-transparent-600 dark:hover:bg-grey-700"
			>NEXT</a
		>
	</div>
</div>
