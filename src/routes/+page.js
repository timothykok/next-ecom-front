import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';


export async function load({ fetch }) {
	try {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/images');
		console.log(resp);

		if (resp.status === 200) {
			const res = await resp.json();
			return {
				images: res // Assuming the response directly contains an array of images
			};
		} else {
			// Handle non-200 status codes (e.g., show an error message)
			console.error(`Error fetching images. Status: ${resp.status}`);
			return {
				images: []
			};
		}
	} catch (error) {
		// Handle fetch errors (e.g., network issues)
		console.error('Error fetching images:', error.message);
		return {
			images: []
		};
	}
}

// import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

// export async function load({ fetch }) {
//   const resp = await fetch(`${PUBLIC_BACKEND_BASE_URL} + images`);

//   const res = await resp.json();
//   if (resp.status == 200) {
//     return {
//       images: res
//     }
//   } else {
//     return {
//       images: []
//     }
//   }
// }
