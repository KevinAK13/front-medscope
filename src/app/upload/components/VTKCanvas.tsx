"use client";
import { useEffect, useRef, useState } from "react";
import vtkRenderer from "@kitware/vtk.js/Rendering/Core/Renderer";
import vtkRenderWindow from "@kitware/vtk.js/Rendering/Core/RenderWindow";
import vtkOpenGLRenderWindow from "@kitware/vtk.js/Rendering/OpenGL/RenderWindow";
import vtkRenderWindowInteractor from "@kitware/vtk.js/Rendering/Core/RenderWindowInteractor";
import vtkInteractorStyleTrackballCamera from "@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera";
import vtkVolume from "@kitware/vtk.js/Rendering/Core/Volume";
import vtkVolumeMapper from "@kitware/vtk.js/Rendering/Core/VolumeMapper";
import vtkColorTransferFunction from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction";
import vtkPiecewiseFunction from "@kitware/vtk.js/Common/DataModel/PiecewiseFunction";
import vtkImageData from "@kitware/vtk.js/Common/DataModel/ImageData";

export default function VTKCanvas({ imageData }: { imageData: vtkImageData }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const renderWindowRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const interactorRef = useRef<any>(null);
    const openGLRenderWindowRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        let timeoutId: NodeJS.Timeout;
        let renderWindow: any;
        let renderer: any;
        let openGLRenderWindow: any;
        let interactor: any;

        const initVTK = () => {
            if (!containerRef.current || !imageData?.getDimensions) return;

            // Cleanup previous instance
            if (renderWindowRef.current) {
                renderWindowRef.current.delete();
                rendererRef.current?.delete();
                interactorRef.current?.delete();
                openGLRenderWindowRef.current?.delete();
            }

            // Initialize VTK
            renderWindow = vtkRenderWindow.newInstance();
            renderer = vtkRenderer.newInstance();
            openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
            interactor = vtkRenderWindowInteractor.newInstance();

            renderWindow.addRenderer(renderer);
            renderWindow.addView(openGLRenderWindow);
            openGLRenderWindow.setContainer(containerRef.current);

            interactor.setView(openGLRenderWindow);
            interactor.initialize();
            interactor.bindEvents(containerRef.current);
            interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

            // Volume setup
            const volumeMapper = vtkVolumeMapper.newInstance();
            volumeMapper.setInputData(imageData);

            const volume = vtkVolume.newInstance();
            volume.setMapper(volumeMapper);

            // Transfer functions
            const colorTF = vtkColorTransferFunction.newInstance();
            colorTF.addRGBPoint(0, 0, 0, 0);
            colorTF.addRGBPoint(255, 0.9, 0.9, 0.9);

            const opacityTF = vtkPiecewiseFunction.newInstance();
            opacityTF.addPoint(0, 0);
            opacityTF.addPoint(255, 1);

            volume.getProperty().setRGBTransferFunction(0, colorTF);
            volume.getProperty().setScalarOpacity(0, opacityTF);
            volume.getProperty().setInterpolationTypeToLinear();

            renderer.addVolume(volume);
            renderer.resetCamera();
            renderWindow.render();

            // Store references
            renderWindowRef.current = renderWindow;
            rendererRef.current = renderer;
            interactorRef.current = interactor;
            openGLRenderWindowRef.current = openGLRenderWindow;
        };

        timeoutId = setTimeout(initVTK, 150);

        return () => {
            clearTimeout(timeoutId);
            if (renderWindowRef.current) {
                renderWindowRef.current.delete();
                rendererRef.current?.delete();
                interactorRef.current?.delete();
                openGLRenderWindowRef.current?.delete();
                
                renderWindowRef.current = null;
                rendererRef.current = null;
                interactorRef.current = null;
                openGLRenderWindowRef.current = null;
            }
        };
    }, [imageData, isClient]);

    return <div ref={containerRef} className="mt-4 w-full h-96 border rounded-lg shadow-md" />;
}