export async function analyzeImage({
  imageFile,
  age,
  gender,
  apiEndpoint,
}: {
  imageFile: File;
  age: string;
  gender: string;
  apiEndpoint: string;
}) {
  const formData = new FormData();
  formData.append("file", imageFile); // Enviar siempre como archivo binario
  formData.append("age", age);
  formData.append("sex", gender);

  try {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Error en la predicción. Intenta nuevamente.");

    return await res.json();
  } catch (err) {
    console.error("Error en el análisis:", err);
    throw err;
  }
}