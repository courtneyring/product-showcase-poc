import { Scroll, ScrollControls, useScroll, Environment, useGLTF, AccumulativeShadows, RandomizedLight, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import pageData from './assets/data';

import {
  editable as e,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import { val } from "@theatre/core";


const Model = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const { scene } = useGLTF('/models/range-rover.glb');

  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  })

  return (
    // <Gltf src='/models/range-rover.glb' />
    <e.primitive object={scene} theatreKey='vehicle' editableType='mesh' />
    // <Porsche scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / 5, 0]} />

    // <e.mesh theatreKey="mesh">
    //   <torusGeometry />
    //   <meshStandardMaterial color={'green'} />
    // </e.mesh>

  )
}

const Experience = () => {

  const pages = 6;

  return (
    <>
      <e.ambientLight intensity={0.5} theatreKey='ambientLight' />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
      {/* <OrbitControls /> */}

      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />

      <ScrollControls pages={pageData.length}>

        <Environment background={false} blur={100} preset='sunset' theatreKey='environment' intensity={0.5} />
        <Model />

        <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
          <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
        </AccumulativeShadows>

        <Scroll>

        </Scroll>
        <Scroll html>
          <div className='container'>
            <div className='section'>
              <h1>Introducing All-New Range Rover</h1>
            </div>
            {
              pageData.map((page, idx) => {
                return <div key={idx} className='section'>
                  <div className='content'>
                    <h2 >{page.title}</h2>
                    <p>{page.body}</p>
                  </div>

                </div>
              })
            }

          </div>

        </Scroll>
      </ScrollControls>

    </>
  )
}

export default Experience;