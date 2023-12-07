<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser } from '../../../utils/auth';
	// import Alert from "../../../components/Alert.svelte";
	// import { alerts } from '../../../utils/alerts/alert';

	let formErrors = {};

	async function logInUser(evt) {
		evt.preventDefault();

		let email = evt.target['email'].value;
		let password = evt.target['password'].value;

		const res = await authenticateUser(email, password);

		if (res.success) {
			goto('/');
			// alerts.setAlert("Succesful login", "alert-success")
		}
	}
</script>

<div class="align-middle">
	<h1 class="text-center text-xl mr-60">Welcome Back</h1>
	<div class="text-center">
		<a class="link-hover italic text-xs mr-10" href="/users/new"
			>Don'have an account? Click here to sign up.</a
		>
	</div>
	<div class="flex justify-center items-center mt-8">
		<form on:submit={logInUser} class="w-1/3">
			<div class="form-control w-full">
				<label class="label" for="email">
					<span class="label-text">Email</span>
				</label>

				<input
					type="text"
					name="email"
					placeholder="johndoe@gmail.com"
					class="input input-bordered w-full"
				/>
				{#if 'email' in formErrors}
					<label class="label" for="email">
						<span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>

				<input
					type="password"
					name="password"
					placeholder=""
					class="input input-bordered w-full"
					required
				/>
				{#if 'password' in formErrors}
					<label class="label" for="password">
						<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
					</label>
				{/if}
			</div>

			<div class="form-control w-full mt-4">
				<button>Login</button>
			</div>
		</form>
	</div>
</div>
