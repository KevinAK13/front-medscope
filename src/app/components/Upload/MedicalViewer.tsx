"use client";

import { useEffect, useRef, useState } from "react";
import * as vtk from "@kitware/vtk.js";
import "@kitware/vtk.js/Rendering/Profiles/All";
import { XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import * as nifti from "nifti-reader-js";

export default function MedicalViewer({ file, onRemove }: { file: File; onRemove: () => void }) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sliceIndex, setSliceIndex] = useState<number>(0);
  const [totalSlices, setTotalSlices] = useState<number>(1);
  const niftiDataRef = useRef<Float32Array | null>(null);
  const niftiHeaderRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;

      const buffer = event.target.result as ArrayBuffer;
      if (nifti.isNIFTI(buffer)) {
        try {
          const header = nifti.readHeader(buffer);
          const imageData = nifti.readImage(header, buffer) as Float32Array;

          niftiHeaderRef.current = header;
          niftiDataRef.current = imageData;
          setTotalSlices(header.dims[3] || 1);
          setSliceIndex(0);

          renderNIfTI(imageData, header, 0);
        } catch (e) {
          console.error("Error parsing NIfTI:", e);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  const renderNIfTI = (imageData: Float32Array, header: any, slice: number) => {
    if (!containerRef.current) return;

    const width = header.dims[1];
    const height = header.dims[2];

    const volumeMapper = vtk.Rendering.Core.vtkImageMapper.newInstance();
    const actor = vtk.Rendering.Core.vtkImageSlice.newInstance();
    actor.setMapper(volumeMapper);

    const renderer = vtk.Rendering.Core.vtkRenderer.newInstance();
    const renderWindow = vtk.Rendering.Core.vtkRenderWindow.newInstance();
    renderWindow.addRenderer(renderer);

    const glRenderWindow = vtk.Rendering.OpenGL.vtkRenderWindow.newInstance();
    renderWindow.addView(glRenderWindow);
    glRenderWindow.setContainer(containerRef.current);

    renderer.addActor(actor);
    rendererRef.current = renderer;

    const minVal = Math.min(...imageData);
    const maxVal = Math.max(...imageData);
    const normalize = (val: number) => ((val - minVal) / (maxVal - minVal)) * 255;

    const imageDataArray = imageData.slice(slice * width * height, (slice + 1) * width * height);
    const normalizedData = imageDataArray.map(normalize);
    
    const vtkDataArray = vtk.Common.Core.vtkDataArray.newInstance({
      numberOfComponents: 1,
      values: normalizedData,
    });

    const vtkImageData = vtk.Common.DataModel.vtkImageData.newInstance();
    vtkImageData.setDimensions(width, height, 1);
    vtkImageData.getPointData().setScalars(vtkDataArray);

    volumeMapper.setInputData(vtkImageData);
    renderWindow.render();
  };

  const nextSlice = () => {
    if (!niftiDataRef.current || !niftiHeaderRef.current) return;
    const newSlice = Math.min(sliceIndex + 1, totalSlices - 1);
    setSliceIndex(newSlice);
    renderNIfTI(niftiDataRef.current, niftiHeaderRef.current, newSlice);
  };

  const prevSlice = () => {
    if (!niftiDataRef.current || !niftiHeaderRef.current) return;
    const newSlice = Math.max(sliceIndex - 1, 0);
    setSliceIndex(newSlice);
    renderNIfTI(niftiDataRef.current, niftiHeaderRef.current, newSlice);
  };

  return (
    <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center relative">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("upload.viewer_title")}</h3>
      
      <div ref={containerRef} className="mt-4 w-full h-96 border rounded-lg shadow-md" />

      {/* 🔹 Navegación entre slices */}
      {totalSlices > 1 && (
        <div className="mt-4 flex justify-center gap-4">
          <button onClick={prevSlice} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
          <span className="text-gray-900 dark:text-white">{sliceIndex + 1} / {totalSlices}</span>
          <button onClick={nextSlice} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
        </div>
      )}

      <button onClick={onRemove} className="absolute top-2 right-2 text-red-600 dark:text-red-400 transition">
        <XCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
