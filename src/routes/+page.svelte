<script>
	
  import { uploadMedia } from "../../utils/s3-uploader.js"
  let formErrors = {};
  let fileInput;

  async function uploadImage(evt) {
    const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);
    evt.preventDefault();


  }
</script>

  
  <style>
    /* Add your styling here */
  </style>
  
  
<div class="pt-4 pl-12">
  <button class="btn" onclick="my_modal_3.showModal()">+ Upload</button>
<dialog id="my_modal_3" class="modal">
  <div class="modal-box gap-4">
    <h3 class="font-bold text-lg">Image Details</h3>
    
      <div class="form-control w-full mt-2 gap-3">
        <input type="text" name="name" placeholder="Enter name" class="input input-bordered w-full"/>
        {#if 'name' in formErrors}
          <label class="label" for="name">
            <span class="label-text-alt text-red-500">{formErrors['name']}</span>
          </label>
        {/if}
      </div>
      <div class="form-control w-full mt-2 gap-3">
        <input type="text" name="description" placeholder="Enter description" class="input input-bordered w-full"/>
        {#if 'description' in formErrors}
          <label class="label" for="description">
            <span class="label-text-alt text-red-500">{formErrors['description']}</span>
          </label>
        {/if}
      </div>
      <div class="form-control w-full mt-2">
        <input type="int" name="price" placeholder="Enter price" class="input input-bordered w-full"/>
        {#if 'price' in formErrors}
          <label class="label" for="price">
            <span class="label-text-alt text-red-500">{formErrors['price']}</span>
          </label>
        {/if}
      </div>
      <form on:submit|preventDefault={uploadImage} on:change={validateForm} class="w-full ">
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

    
