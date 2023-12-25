export default function (data: object): FormData {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") {
      value = value.trim();
    }
    formData.append(key, value);
  });
  return formData;
}
