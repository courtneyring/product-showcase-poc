
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from 'react';
import { useGSAP } from "@gsap/react";
import './Floatin.css';


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);


const FloatIn = ({ children }) => {
  const node = useRef();

  // useGSAP(() => {
  //   gsap.from(node, {
  //     opacity: 0,
  //     y: '2vh',
  //     duration: 0.5,
  //     scrollTrigger: {
  //       trigger: node,
  //       start: 'top bottom-=40%',
  //       markers: true
  //     },
  //   });

  // }, { scope: node });

  useLayoutEffect(() => {
    let el = node.current.node;
    gsap.from(el, {
      opacity: 0,
      y: '2vh',
      duration: 0.5,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=40%',
        markers: true
      },
    });
  })

  return (
    <div ref={node} className='gsap-container'>
      {children}
    </div>

  )
}

export default FloatIn;