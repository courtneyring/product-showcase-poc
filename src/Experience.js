import { Scroll, ScrollControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import pageData from './assets/data';
import { useRef } from 'react';
import Model from './components/Model/Model';
import Pages from './components/Pages/Pages';

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { editable as e, PerspectiveCamera } from "@theatre/r3f";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


const Experience = () => {

  const node = useRef()

  // useGSAP(() => {
  //   gsap.from(node.current, {
  //     opacity: 0,
  //     y: '2vh',
  //     duration: 0.5,
  //     scrollTrigger: {
  //       trigger: node.current,
  //       start: 'top bottom-=40%',
  //       markers: true
  //     },
  //   });

  // }, { scope: node });

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

         <Pages pageData={pageData} />

      </ScrollControls>

    </>
  )
}

export default Experience;