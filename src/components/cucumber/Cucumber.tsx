import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'

const Cucumber = () => {
  const [rotateX, setRotateX] = useState(0);

  return (
    <div className="cucumber">
      <Canvas dpr={[1, 2]} shadows camera={{ position: [-5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Cucumber;
