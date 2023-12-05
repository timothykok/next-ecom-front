// // Importing constants from environment variables
// import { PUBLIC_AWS_REGION, PUBLIC_AWS_BUCKET, PUBLIC_IDENTITY_POOL_ID } from '$env/static/public';


// // Function to upload media to AWS S3
// export async function uploadMedia(file, directory = "") {
//   // Configuring AWS with provided constants
//   AWS.config.update({
//     region: PUBLIC_AWS_REGION,
//     credentials: new AWS.CognitoIdentityCredentials({
//       IdentityPoolId: PUBLIC_IDENTITY_POOL_ID
//     })
//   });

//   // Function to get the file extension
//   const getFileExtension = (str) => str.slice(str.lastIndexOf("."));

//   // Creating key and fullKey for the S3 object
//   const directoryKey = directory ? directory + "/" : "";
//   const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '-').toLowerCase();
//   const fileExtension = getFileExtension(file.name);
//   const fullKey = directoryKey + fileName + fileExtension;

//   // Creating a ManagedUpload instance for S3 upload
//   const upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: PUBLIC_AWS_BUCKET,
//       Key: fullKey,
//       Body: file,
//     }
//   });

//   try {
//     // Uploading the file and waiting for the promise to resolve
//     const res = await upload.promise();

//     // Returning an array with the original file name and the S3 location
//     return [file.name, res.Location];
//   } catch (err) {
//     // Handling errors and showing an alert
//     return alert(`There was an error uploading your photo: ${err}`);
//   }
// }

import { PUBLIC_AWS_REGION, PUBLIC_AWS_BUCKET, PUBLIC_IDENTITY_POOL_ID } from '$env/static/public';


export async function uploadMedia(file, directory = "") {
  AWS.config.update({
    region: PUBLIC_AWS_REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: PUBLIC_IDENTITY_POOL_ID
    })
  });

  const getFileExtension = (str) => str.slice(str.lastIndexOf("."));
  const directoryKey = directory ? directory + "/" : "";
  const fileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const fileExtention = getFileExtension(file.name)
  const fullKey = directoryKey + fileName + fileExtention;

  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: PUBLIC_AWS_BUCKET,
      Key: fullKey,
      Body: file,
    }
  });

  try {
    const res = await upload.promise();
    return [file.name, res.Location];
  } catch (err) {
    return alert(`There was an error uploading your photo: ${err}`);
  }
}