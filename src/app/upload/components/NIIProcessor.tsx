import * as nifti from "nifti-reader-js";
import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import vtkImageData from "@kitware/vtk.js/Common/DataModel/ImageData";

export function convertNIfTIToVTK(buffer: ArrayBuffer): vtkImageData | null {
  if (!nifti.isNIFTI(buffer)) return null;

  try {
    const header = nifti.readHeader(buffer);
    const imageData = new Float32Array(nifti.readImage(header, buffer));

    console.log("✅ Archivo NIfTI leído correctamente");

    const width = header.dims[1] || 1;
    const height = header.dims[2] || 1;
    const depth = header.dims[3] || 1;
    const numberOfComponents = header.dims[4] || 1; // 🔥 Si es mayor que 1, hay más de un volumen

    const voxelSpacing: [number, number, number] = [
      header.pixDims[1] || 1.0,
      header.pixDims[2] || 1.0,
      header.pixDims[3] || 1.0,
    ];

    console.log(`📏 Dimensiones: ${width}x${height}x${depth}`);
    console.log(`🔬 Espaciado de Vóxel: ${voxelSpacing}`);
    console.log(`🧩 Número de componentes por voxel: ${numberOfComponents}`);

    const expectedSize = width * height * depth * numberOfComponents;
    if (imageData.length !== expectedSize) {
      console.error(
        `❌ Error: Tamaño de datos (${imageData.length}) no coincide con el esperado (${expectedSize})`
      );
      return null;
    }
    

    // ✅ Normalizar los valores entre 0 y 255
    let minVal = Infinity;
    let maxVal = -Infinity;
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i] < minVal) minVal = imageData[i];
      if (imageData[i] > maxVal) maxVal = imageData[i];
    }

    const normalize = (val: number) => ((val - minVal) / (maxVal - minVal)) * 255;
    const normalizedData = new Float32Array(imageData.length);
    for (let i = 0; i < imageData.length; i++) {
      normalizedData[i] = normalize(imageData[i]);
    }

    const vtkDataArrayInstance = vtkDataArray.newInstance({
      numberOfComponents,
      values: normalizedData,
    });

    const vtkImageDataInstance = vtkImageData.newInstance();
    vtkImageDataInstance.setSpacing(...voxelSpacing);
    vtkImageDataInstance.setOrigin(0, 0, 0);
    vtkImageDataInstance.setDimensions(width, height, depth);
    vtkImageDataInstance.getPointData().setScalars(vtkDataArrayInstance);

    console.log("✅ Conversión a vtkImageData completada");
    return vtkImageDataInstance;
  } catch (error) {
    console.error("❌ Error procesando NIfTI:", error);
    return null;
  }
}


