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
import Overlay from './components/Overlay/Overlay';
import { createPortal } from 'react-dom';

import { editable as e, PerspectiveCamera } from "@theatre/r3f";
import './Experience.css';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


const Experience = ({ pageData, currentSection }) => {
  const { camera, raycaster } = useThree();
  const [points, setPoints] = useState([])
  // const [modalIsOpen, setModalIsOpen] = useState();
  const [activeHotspot, setActiveHotspot] = useState();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const node = useRef()
  const itemRefs = useRef([]);


  useEffect(() => {
    let hotspots = pageData[currentSection].hotspots || [];
    let arr = hotspots.map((hotspot, idx) => {
      return {
        ...hotspot,
        position: new THREE.Vector3(...hotspot.position),
      }
    })
    setPoints(arr);

  }, [currentSection])


  // const setActiveHotspot = (idx) => {
  //   points[idx].active = true;
  //   setModalIsOpen(true)
  // }

  // const unsetActiveHotspot = () => {
  //   points.forEach((point) => point.active = false)
  //   setModalIsOpen(false);
  // }

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
          return <div className='point' ref={el => itemRefs.current[idx] = el} onClick={() => setActiveHotspot(idx)}>
            <div className='point__hotspot'></div>
            <div className='point__label'>{point.title}</div>
          </div>
        })}
        {activeHotspot !== undefined && createPortal(
          <Overlay closeFn={() => setActiveHotspot()}>
            <h2>{points[activeHotspot].title}</h2>
            <p>{points[activeHotspot].body}</p>

          </Overlay>,
          document.body
        )
        }
      </Html>

      
    </>
  )
}

export default Experience;