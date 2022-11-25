export function Pointer({ vec = new THREE.Vector3()}){
  const ref = useRef()
  useFrame(({mouse, viewport}) => {
    vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <Attractor range={1} strength={10} type="linear" position={[0, 0, 0]} />
    </RigidBody>
  )
}