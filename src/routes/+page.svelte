<script>
	import { uploadMedia } from '../utils/s3-uploader.js'
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	// export let images = [];
  import { getTokenFromLocalStorage } from '../utils/auth.js'
	import Alert from '../components/Alert.svelte';
  import {load} from '../routes/+page.js'
  let formErrors = {};


	async function uploadImage(evt) {
		const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);

    const token = getTokenFromLocalStorage()

		const formData = {
      title: evt.target['title'].value,
      description: evt.target['description'].value,
      price: evt.target['price'].value,
      fileName: fileName,
      fileUrl: fileUrl
		};

    console.log(formData)
    

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/upload', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
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



</script>

<svelte:head>
	<script src="/aws-sdk-s3.min.js"></script>
</svelte:head>


<div class = "pl-10 pt-8">
  <button class="btn" onclick="my_modal_3.showModal()">+Upload</button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form on:submit={uploadImage} method ="dialog">
        <div class="form-control w-full">
          <label class="label" for="title">
            <span class="label-text">Title</span>
          </label>
          <input type="text" name="title" placeholder="Enter Image Title" class="input input-bordered w-full" />
          {#if 'title' in formErrors}
            <label class="label" for="title">
              <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
            </label>
          {/if}
        </div>
      
        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text">Description</span>
          </label>
          <input
            type="description"
            name="description"
            placeholder="It is what it is"
            class="input input-bordered w-full"
            required
          />
          {#if 'description' in formErrors}
            <label class="label" for="description">
              <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
            </label>
          {/if}
        </div>
        <div class="form-control w-full">
          <label class="label" for="price">
            <span class="label-text">Price</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder=""
            class="input input-bordered w-full"
            required
          />
          {#if 'price' in formErrors}
            <label class="label" for="price">
              <span class="label-text-alt text-red-500">{formErrors['Price'].message}</span>
            </label>
          {/if}
        </div>
      
        <div class="form-control ">
          <label class="label" for="file">
            <span class="label-text">file</span>
          </label>
          <input
            type="file"
            name="file"
            required
          />
          {#if 'file' in formErrors}
            <label class="label" for="file">
              <span class="label-text-alt text-red-500">{formErrors['file'].message}</span>
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
<!-- 
<div class="image-container">
  {#each images as image }
    <img src={load(image)} alt={image.fileName} class="image" />
  {/each}
</div> -->