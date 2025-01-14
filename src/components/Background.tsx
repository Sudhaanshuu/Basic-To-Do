import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed = 1, distort = 0.4 }) {
  const ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
    ref.current.rotation.x = time * 0.2;
    ref.current.rotation.z = time * 0.2;
  });

  return (
    <Sphere ref={ref} position={position} args={[1, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        speed={0.5}
        distort={distort}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function FloatingCube({ position, color, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.3 * speed;
    ref.current.rotation.y = time * 0.2 * speed;
    ref.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
  });

  return (
    <Box ref={ref} position={position} args={[1.5, 1.5, 1.5]}>
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.8}
        wireframe
      />
    </Box>
  );
}

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <FloatingSphere
          position={[-4, 2, -5]}
          color="#FF5F1F"
          speed={0.8}
          distort={0.3}
        />
        <FloatingSphere
          position={[4, -2, -8]}
          color="#9D4EDD"
          speed={0.5}
          distort={0.5}
        />
        <FloatingCube
          position={[0, 0, -3]}
          color="#FF5F1F"
          speed={0.3}
        />

        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}