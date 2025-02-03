export const predictImage = async (imageUri: string) => {
  const formData = new FormData() as any;

  formData.append("file", {
    uri: imageUri,
    name: "image.png",
    type: "image/png",
  });

  const response = await fetch("http://192.168.1.69:8000/predict", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await response.json();

  return data;
};
