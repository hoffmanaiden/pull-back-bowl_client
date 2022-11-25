import * as THREE from "three"
import { useRef, useState, useEffect, useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Physics, RigidBody, Debug, BallCollider, Attractor } from "@react-three/rapier";
import { AppContext } from "./App";

export function Launcher(props, { vec = new THREE.Vector3() }) {
  const { state, dispatch } = useContext(AppContext)
  function grab() {
    dispatch({type: 'setDragObj', value: 'Launcher'})
  }
  function letGo() {
    dispatch({type: 'clearDragObj'})
  }
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: ((mouse.y * viewport.height) / 2) - 2, z: 0 }, 0.2)
    if (state.activeDragObj === 'Launcher') {
      ref.current.setTranslation(vec)
      console.log(vec)
    }
  })
  return (
    <group>
      {/* external ball */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color={'#32a852'} transparent={true} opacity={0.3} />
      </mesh>
      {/* internal ball - handle */}
      <RigidBody colliders="ball" type={"kinematicPosition"} ref={ref} >
        <mesh 
          position={state.handlePos}
          onPointerDown={(event) => grab()}
          onPointerUp={(event) => letGo()}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
      </RigidBody>
    </group>
  )
}




export function LaunchClickBall(props) { }










// Not using, but keeping for reference 
// ====================================
export function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ mouse, viewport }) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <Attractor range={1} strength={10} type="linear" position={[0, 0, 0]} />
    </RigidBody>
  )
}