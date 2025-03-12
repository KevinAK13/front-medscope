export const aiTools = [
  {
    title: "aiTools.melanoma.title",
    description: "aiTools.melanoma.description",
    image: "/img/melanoma.jpg",
    link: "/tools/melanoma",
    slug: "melanoma",
    apiEndpoint: "https://skin-ai-production.up.railway.app/predict", // ✅ IA habilitada
  },
  {
    title: "aiTools.covid.title",
    description: "aiTools.covid.description",
    image: "/img/lung.jpg",
    link: "/tools/covid-pneumonia",
    slug: "covid-pneumonia",
    apiEndpoint: null, // ❌ IA deshabilitada
  },
  {
    title: "aiTools.breast_cancer.title",
    description: "aiTools.breast_cancer.description",
    image: "/img/breast.jpg",
    link: "/tools/breast-cancer",
    slug: "breast-cancer",
    apiEndpoint: null, // ❌ IA deshabilitada
  }
];
