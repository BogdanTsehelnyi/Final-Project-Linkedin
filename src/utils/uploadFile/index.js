export const uploadFile = async (file, folderName) => {
  const fileName = encodeURIComponent(file.name);
  const bucketUrl = "https://finalprojectawsdanit.s3.amazonaws.com";
  const uploadUrl = `${bucketUrl}/${folderName}/${fileName}`;

  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (response.ok) {
      console.log("File uploaded successfully!");
      return uploadUrl;
    } else {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error during upload:", error);
    throw error;
  }
};
