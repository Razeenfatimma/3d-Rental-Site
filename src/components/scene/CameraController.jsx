// CameraController.jsx
// This component controls smooth camera transitions when a user selects or deselects a floor.
//
// WHY THIS WORKS:
// - R3F's `useFrame` advances the camera only while a floor/property transition is active.
// - Three.js `Vector3.lerp(target, alpha)` creates a smooth ease-out transition.
// - If OrbitControls is present, updating `controls.target` ensures the orbit center smoothly shifts
//   to the selected floor; stopping at the target leaves orbit and zoom under user control.

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

// Default home camera angle when viewing the entire property
const DEFAULT_CAMERA_POS = new Vector3(5, 5, 5);
const DEFAULT_TARGET = new Vector3(0.6, 1.2, 0.2);

export default function CameraController({ activeRoom, resetKey, controlsRef }) {
  const { camera } = useThree();

  // Reusable Vector3 instances to avoid memory allocation inside the 60fps render loop
  const targetCamPos = useRef(new Vector3());
  const targetLookAt = useRef(new Vector3());
  const isTransitioning = useRef(true);

  useEffect(() => {
    isTransitioning.current = true;
  }, [activeRoom, resetKey]);

  useFrame(() => {
    if (!isTransitioning.current) return;

    // 1. Determine where the camera and look-target should go
    if (activeRoom) {
      // If a floor is selected, target that floor's coordinates
      targetCamPos.current.set(
        activeRoom.cameraPosition[0],
        activeRoom.cameraPosition[1],
        activeRoom.cameraPosition[2]
      );
      targetLookAt.current.set(
        activeRoom.target[0],
        activeRoom.target[1],
        activeRoom.target[2]
      );
    } else {
      // If no floor is selected, gently return to the full building overview
      targetCamPos.current.copy(DEFAULT_CAMERA_POS);
      targetLookAt.current.copy(DEFAULT_TARGET);
    }

    // 2. Smoothly interpolate the camera position towards the target
    camera.position.lerp(targetCamPos.current, 0.08);

    // 3. Smoothly update OrbitControls target so camera pivots around the active floor
    if (controlsRef && controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.05);
      // Notify OrbitControls that its target changed
      controlsRef.current.update();
      if (
        camera.position.distanceToSquared(targetCamPos.current) < 0.0001 &&
        controlsRef.current.target.distanceToSquared(targetLookAt.current) < 0.0001
      ) {
        isTransitioning.current = false;
      }
    } else {
      // Fallback direct camera lookAt if controlsRef is not provided
      camera.lookAt(targetLookAt.current);
      if (camera.position.distanceToSquared(targetCamPos.current) < 0.0001) {
        isTransitioning.current = false;
      }
    }
  });

  // This is a headless logic component, so it renders nothing to the DOM/Canvas
  return null;
}
