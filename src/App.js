import './App.css';
import { useRef, useState, useEffect, createContext, useReducer, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { Physics, RigidBody, Debug, Attractor } from "@react-three/rapier";
import { Sphere, Cube, Platform, Pointer } from './BasicShapes'

import { reducer } from './State'


export const AppContext = createContext(null)

const initialState = {
  activeDragObj: null
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const providerValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <div className="App">
      <AppContext.Provider value={providerValue}>
        <Canvas camera={{ position: [0, 10, 50], fov: 15 }}>
          {/* <OrbitControls /> */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Physics>
            <Debug />
            {/* <Pointer /> */}
            <Platform args={[10, 0.3, 10]} position={[0,-3,3]}/>
            <Platform args={[10, 0.3, 10]} position={[0,-3,-15]}/>
            <Sphere />
            {/* <Cube /> */}
          </Physics>
        </Canvas>
      </AppContext.Provider>
    </div>
  );
}

export default App;
