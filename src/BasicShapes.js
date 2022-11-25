import * as THREE from "three"
import { useRef, useState, useEffect, useContext } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls, PresentationControls } from '@react-three/drei'
import { Physics, RigidBody, Debug, BallCollider, Attractor } from "@react-three/rapier";


import { AppContext } from "./App";


export function Cube(props) {
  return (
    <RigidBody colliders="cuboid">
      <mesh position={[0, 2, 0]}>
        <boxGeometry {...props} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </RigidBody>
  )
}

export function Sphere({ vec = new THREE.Vector3()}){
  const { state, dispatch } = useContext(AppContext)
  function pickUp(){
    dispatch({type: 'setDragObj', value: 'Sphere'})
  }
  function drop(){
    dispatch({type: 'clearDragObj'})
  }
  const ref = useRef()
  useFrame(({mouse, viewport}) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: ((mouse.y * viewport.height) / 2) - 2, z: 0 }, 0.2)
    if(state.activeDragObj === 'Sphere'){
      ref.current.setTranslation(vec) 
    }
  })
  return(
    <RigidBody colliders="ball" ref={state.activeDragObj === 'Sphere' ? ref : null}>
      <mesh 
        position={[0, 2, 0]}
        onPointerDown={(event) => pickUp()}
        onPointerUp={(event) => drop()}
        // onTouchStart={(event) => pickUp()}
        // onTouchEnd={(event) => drop()}
        // onTouchMove={(event) => pickUp()}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </RigidBody>
  ) 
}

export function Platform(props) {
  return (
    <RigidBody colliders="cuboid" type="kinematicPosition">
      <mesh position={props.position}>
        <boxGeometry {...props} />
        <meshStandardMaterial color={'yellowgreen'} />
      </mesh>
    </RigidBody>
  )
}