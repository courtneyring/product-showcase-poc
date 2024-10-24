import { Scroll, ScrollControls, Environment, AccumulativeShadows, RandomizedLight, Html, OrbitControls } from '@react-three/drei';
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


const Experience = ({ pageData, currentSection }) => {
  const { camera, raycaster } = useThree();
  const [points, setPoints] = useState([])
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const node = useRef()
  const itemRefs = useRef([]);
  // const point0 = useRef()
  // const point1 = useRef()
  // const point2 = useRef()

  useEffect(() => {
    let hotspots = pageData[currentSection].hotspots || [];
    let arr = hotspots.map((hotspot, idx) => {
      return {
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position),
      }
    })
    setPoints(arr);

    // setPoints([
    //   {
    //     position: new THREE.Vector3(2, 0.3, - 0.6),
    //     element: point0
    //   },
    //   {
    //     position: new THREE.Vector3(0.5, 0.8, - 1.6),
    //     element: point1
    //   },
    //   {
    //     position: new THREE.Vector3(1.6, - 1.3, - 0.7),
    //     element: point2
    //   }
    // ])

  }, [currentSection])


  useEffect(() => {
    console.log(points)
  }, [points])


  useFrame(() => {
    points.forEach((point, i) => {
      if (!itemRefs.current[i]) return;

      const screenPosition = point.position.clone()
      screenPosition.project(camera)

      raycaster.setFromCamera(screenPosition, camera)
      const intersects = raycaster.intersectObjects(itemRefs.current[i])

      // No intersect found
      if (intersects.length === 0) {
        // Show
        itemRefs.current[i].classList.add('visible')
      }

      // Intersect found
      else {
        // Get the distance of the intersection and the distance of the point
        const intersectionDistance = intersects[0].distance
        const pointDistance = point.position.distanceTo(camera.position)

        // Intersection is close than the point
        if (intersectionDistance < pointDistance) {
          // Hide
          itemRefs.current[i].classList.remove('visible')
        }
        // Intersection is further than the point
        else {
          // Show
          itemRefs.current[i].classList.add('visible')
        }
      }


      
      const translateX = screenPosition.x * sizes.width * 0.5
      const translateY = - screenPosition.y * sizes.height * 0.5
      if (itemRefs.current[i]) {
        itemRefs.current[i].style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
      }
    })
  })




  return (
    <>
      <e.ambientLight intensity={0.5} theatreKey='ambientLight' />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
      {/* <OrbitControls  enableZoom={false} enablePan={false}/> */}
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />


      <Environment background={false} blur={100} preset='sunset' theatreKey='environment' intensity={0.5} />
      <Model currentSection={currentSection} />

      <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0.9} scale={10}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
      </AccumulativeShadows>
      <Html>
        {points.map((point, idx) => {
          return <div className='point' ref={el => itemRefs.current[idx] = el}>
            <div className='point__hotspot'></div>
            <div className='point__label'>{point.title}</div>
          </div>
        })}
      </Html>


    </>
  )
}

export default Experience;