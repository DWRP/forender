import React, { createRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import { useRenderConfigs } from "@/hooks/useRenderConfigs";

type RefMash = React.RefObject<
  Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  >
>;

const useMashFrameRotation = (
  ref: RefMash,
  rotateY: boolean,
  rotateX: boolean
) => {
  useFrame((_state, delta) => {
    if (ref?.current) {
      if (rotateY) {
        ref.current.rotation.x += delta;
      }
      if (rotateX) {
        ref.current.rotation.y += delta;
      }
    }
  });
};

export const Box = () => {
  const { configs } = useRenderConfigs();
  const ref: RefMash = createRef();
  useMashFrameRotation(
    ref,
    configs.box.hasVerticalRotation,
    configs.box.hasHorizontalRotation
  );
  return (
    <mesh ref={ref} position={[0, 2, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={configs.box.color} />
    </mesh>
  );
};

export const Cone = () => {
  const { configs } = useRenderConfigs();
  const ref: RefMash = createRef();
  useMashFrameRotation(
    ref,
    configs.cone.hasVerticalRotation,
    configs.cone.hasHorizontalRotation
  );
  return (
    <mesh ref={ref} position={[0, 0, -1]}>
      <coneGeometry />
      <meshStandardMaterial color={configs.cone.color} />
    </mesh>
  );
};

export const Dodecahedron = () => {
  const { configs } = useRenderConfigs();
  const ref: RefMash = createRef();
  useMashFrameRotation(
    ref,
    configs.dodecahedron.hasVerticalRotation,
    configs.dodecahedron.hasHorizontalRotation
  );
  return (
    <mesh ref={ref} position={[0, -3, -1]}>
      <dodecahedronGeometry />
      <meshStandardMaterial color={configs.dodecahedron.color} />
    </mesh>
  );
};

const Renderização = () => {
  const { configs } = useRenderConfigs();
  return (
    <Canvas>
      <ambientLight />
      <spotLight />

      {configs.box.enabled && <Box />}
      {configs.cone.enabled && <Cone />}
      {configs.dodecahedron.enabled && <Dodecahedron />}
    </Canvas>
  );
};

export default Renderização;
