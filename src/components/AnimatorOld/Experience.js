import React, { useState } from "react";
import { Suspense } from "react";
import { easing } from "maath";
import {useFrame } from "@react-three/fiber";
import Avatar from './Models/Avatar';
import Woman from './Models/Woman';
import {Environment as EnvironmentImpl,OrbitControls  } from '@react-three/drei'

const Experience = ({ character }) => {
  // eslint-disable-next-line
  function Rig() {
    return useFrame((state, delta) => {
      easing.damp3(state.camera.position, [1 + state.mouse.x / 4, 1.5 + state.mouse.y / 4, 2.5], 0.2, delta)
    })
  }
  // eslint-disable-next-line
  const [animationIndex, setAnimationIndex] = useState(0);
  const Character = character === 'avatar' ? Avatar : Woman;
  return (
    <>
    <EnvironmentImpl preset="city" />
    <directionalLight intensity={0.1} position={[-5, 5, 5]} castShadow shadow-mapSize={500} />
    <directionalLight position={[0, 5, 0]} intensity={0.1}  />
    <directionalLight position={[-5, 5, -5]} intensity={0.1}  />
    <directionalLight position={[5, 5, 5]} intensity={0.1}  />
    <ambientLight intensity={0.1} />
      <group position={[0, -1, 0]}>
      <Suspense fallback={null}>
      <Character animationIndex={animationIndex}  scale={1}  />
        </Suspense>
      </group>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeBufferGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
export default Experience;