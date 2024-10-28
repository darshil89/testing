export async function PostToCloudinary(file: File) {
  const uploadedImageUrls = "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jx3jfkqs");
  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const uploadImageData = await uploadResponse.json();
  return uploadImageData.secure_url;
}
