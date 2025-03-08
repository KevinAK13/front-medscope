export const aiTools = [
  {
    title: "Melanoma Detection",
    description: "AI-powered skin cancer detection using deep learning.",
    image: "/img/melanoma.jpg",
    link: "/tools/melanoma",
    slug: "melanoma",
    apiEndpoint: "https://skin-ai-production.up.railway.app/predict", // 🔥 Endpoint para predicciones de melanoma
  },
  {
    title: "COVID-19 & Pneumonia Diagnosis",
    description: "Analyze chest X-rays to detect pneumonia and COVID-19.",
    image: "/img/lung.jpg",
    link: "/tools/covid-pneumonia",
    slug: "covid-pneumonia",
    apiEndpoint: "https://xray-lung-ai.up.railway.app/predict", // 🔥 Endpoint para diagnóstico de neumonía y COVID-19
  },
  {
    title: "Breast Cancer Biopsy Analysis",
    description: "Early detection of breast cancer through biopsy image analysis.",
    image: "/img/breast.jpg",
    link: "/tools/breast-cancer",
    slug: "breast-cancer",
    apiEndpoint: "https://cell-cancer-api.up.railway.app/predict", // 🔥 Endpoint para clasificación de células cancerígenas
  },
];
