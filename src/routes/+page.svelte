<script>
	import { uploadMedia } from '../utils/s3-uploader.js';
	import { goto } from '$app/navigation';
	// export let images = [];
  import { getTokenFromLocalStorage } from '../utils/auth.js';


	async function uploadImage(evt) {
		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
    console.log(fileName)
    console.log(fileUrl)


		const formData = {
			fileName: evt.target['fileName'].value,
			description: evt.target['description'].value,
			price: evt.target['price'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': getTokenFromLocalStorage()
			},
			body: JSON.stringify(formData)
		});

		if (resp.status == 200) {
			goto('/');
      console.log("Success")
		} else {
			const res = await resp.json();
			formErrors = res.data;
		}
	}
	let formErrors = {};
</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

<div class="pt-4 pl-12 mt-4">
	<button class="btn" onclick="my_modal_3.showModal()">+ Upload</button>
	<dialog id="my_modal_3" class="modal">
		<div class="modal-box gap-4">
			<h3 class="font-bold text-lg">Image Details</h3>

			<div class="form-control w-full mt-2 gap-3">
				<input
					type="text"
					name="fileName"
					placeholder="Enter name"
					class="input input-bordered w-full"
				/>
				{#if 'fileName' in formErrors}
					<label class="label" for="fileName">
						<span class="label-text-alt text-red-500">{formErrors['fileName']}</span>
					</label>
				{/if}
			</div>
			<div class="form-control w-full mt-2 gap-3">
				<input
					type="text"
					name="description"
					placeholder="Enter description"
					class="input input-bordered w-full"
				/>
				{#if 'description' in formErrors}
					<label class="label" for="description">
						<span class="label-text-alt text-red-500">{formErrors['description']}</span>
					</label>
				{/if}
			</div>
			<div class="form-control w-full mt-2">
				<input
					type="int"
					name="price"
					placeholder="Enter price"
					class="input input-bordered w-full"
				/>
				{#if 'price' in formErrors}
					<label class="label" for="price">
						<span class="label-text-alt text-red-500">{formErrors['price']}</span>
					</label>
				{/if}
			</div>
			<form on:submit|preventDefault={uploadImage} class="w-full">
				<div class="form-control w-full mt-2">
					<input type="file" name="file" />
					{#if 'file' in formErrors}
						<label class="label" for="file">
							<span class="label-text-alt text-red-500">{formErrors['file']}</span>
						</label>
					{/if}
				</div>
				<div class="form-control w-full mt-4">
					<button class="btn btn-md">Upload</button>
				</div>
			</form>
		</div>
	</dialog>
</div>

<!-- <div class="overflow-x-auto w-full">  
  {#each images as image (image.id)}
    <div class = "flex flex-row mt-10">
      <img {image} alt={image.fileName} />
      <p>{image.fileName}</p>
      <p>{image.price}</p>
    </div>
  {/each}
</div> -->
