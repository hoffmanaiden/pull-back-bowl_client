import * as THREE from "three"
import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls, PresentationControls } from '@react-three/drei'
import { Physics, RigidBody, Debug, BallCollider, Attractor } from "@react-three/rapier";
import { useSpring, animated } from '@react-spring/three'
import { useGesture, useDrag } from '@use-gesture/react'

export function Sphere(props) {
  const ref = useRef()
  const [active, setActive] = useState(false)
  const { position } = useSpring({ position: active ? [6, 3, 0] : [5, 3, 0] })

  const {size, viewport} = useThree()
  const aspect = size.width / viewport.width

  // const [spring, set] = useSpring(() => ({position: [0, 3, 0], config: { friction: 10 } }))
  // const bind = useGesture({
  //   onDrag: ({ offset: [x,y]}) => set({ position: [x / aspect, -y / aspect, 0] })
  // })

  const [spring, set] = useSpring(() => ({position: [0, 3, 0] }))
  const bind = useGesture({
    onDrag: ({ offset: [x,y]}) => ref.current.setNextKinematicTranslation([5,3,5])
  })


  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   if(active){
  //     ref.current.applyImpulse({x:0.1, y:0, z:-0.1}, true)
  //     setTimeout(() => {
  //       ref.current.applyImpulse({x:0, y:1, z:0}, true)
  //     }, 2000)
  //   }
  // })

  return (
    <RigidBody colliders="ball" type="Dynamic" position={[0,3,0]} ref={ref} {...bind()}>
      <mesh
        // onClick={() => setActive(!active)}
        onPointerDown={(event) => console.log(event)}
        onPointerUp={(event) => console.log(event)}
        // {...spring}
        // {...bind()}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </RigidBody>

  )
}

export function Pointer({ vec = new THREE.Vector3()}){
  const ref = useRef()
  useFrame(({mouse, viewport}) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      {/* <BallCollider args={[2]} /> */}
      <Attractor range={1} strength={5} type="linear" position={[0, 0, 0]} />
    </RigidBody>
  )
}

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

export function Platform(props) {
  return (
    <RigidBody colliders="cuboid" type="kinematicPosition">
      <mesh>
        <boxGeometry {...props} />
        <meshStandardMaterial color={'yellowgreen'} />
      </mesh>
    </RigidBody>
  )
}