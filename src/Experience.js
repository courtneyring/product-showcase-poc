import { Scroll, ScrollControls, Environment, AccumulativeShadows, RandomizedLight, Html } from '@react-three/drei';
import pageData from './assets/data';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Model from './components/Model/Model';
import Pages from './components/Pages/Pages';
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { editable as e, PerspectiveCamera } from "@theatre/r3f";
import './Experience.css';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


const Experience = () => {
  const { camera } = useThree();
  const [points, setPoints] = useState([])
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const node = useRef()
  const point0 = useRef()
  const point1 = useRef()
  const point2 = useRef()

  useLayoutEffect(() => {
    setPoints([
      {
        position: new THREE.Vector3(2, 0.3, - 0.6),
        element: point0
      },
      {
        position: new THREE.Vector3(0.5, 0.8, - 1.6),
        element: point1
      },
      {
        position: new THREE.Vector3(1.6, - 1.3, - 0.7),
        element: point2
      }
    ])

  }, [])



  useFrame(() => {
    // console.log(points)
    points.forEach((point, i) => {
      const screenPosition = point.position.clone()
      screenPosition.project(camera)
      const translateX = screenPosition.x * sizes.width * 0.5
      const translateY = - screenPosition.y * sizes.height * 0.5
      point.element.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
    })
  })

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

      {/* <ScrollControls pages={pageData.length}>  */}
      <Environment background={false} blur={100} preset='sunset' theatreKey='environment' intensity={0.5} />
      <Model />

      <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
      </AccumulativeShadows>
      <Html>
        <div className='point point-0' ref={point0}></div>
        <div className='point point-1' ref={point1}></div>
        <div className='point point-2' ref={point2}></div>
      </Html>

      {/* <Html fullscreen center transform={false} style={{backgroundColor: 'green'}} wrapperClass='html-wrapper'>
        <Pages pageData={pageData} />
    </Html>
          */}

      {/* </ScrollControls> */}

    </>
  )
}

export default Experience;