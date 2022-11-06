import './App.css';
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { Physics, RigidBody, Debug, Attractor } from "@react-three/rapier";
import { Sphere, Cube, Platform, Pointer } from './BasicShapes'


function App() {
  let [state, setState] = useState()
  let [target, setTarget] = useState(null)
  let [activeDragObj, setActiveDragObj] = useState(null)

  return (
    <div className="App">
      <Canvas camera={{ position: [-50, 25, 50], fov: 15 }}>
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Physics>
          <Debug/>
          {/* <Pointer/> */}
          <Platform args={[10, 0.3, 10]} />
          {/* <Cube args={[2, 2, 2]} position={[10, 10, 10]} /> */}
          <Sphere/>
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
