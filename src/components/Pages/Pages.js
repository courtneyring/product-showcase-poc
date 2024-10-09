import { useFrame } from '@react-three/fiber';
// import Page from '../Page/Page';
import { useScroll } from '@react-three/drei';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Scroll } from '@react-three/drei';
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import './Pages.css';

const Pages = ({ pageData }) => {

  const isMobile = window.innerWidth < 768;
 
  useGSAP(() => {
    const headings = document.querySelectorAll('.heading');
    // // const nums = document.querySelectorAll('.scroll-num');s
    // const head = document.querySelector('.swipe-section');

    const numOfTransitions = headings.length

    const singleDuration = 1000;
    const totalDuration = singleDuration * numOfTransitions;

    // gsap.to('.head', {
    //   scrollTrigger: {
    //     // scroller: ".page-container",
    //     pin: '.head',
    //     end: '+=' + `${totalDuration}s`,
    //     // pinSpacing: true,
    //   },
    // });

    // console.log(headings)

    headings.forEach((heading, i) => {
      let content = heading.querySelectorAll('.content');
      let tl = gsap.to(content, {
        opacity: 1,
        delay: 0.5,
        ...(isMobile && {bottom: '7%'}), 
        ...(!isMobile && { top: '20%' }), 
        scrollTrigger: {
          // scroller: ".page-container",
          trigger: heading,
          toggleActions: 'play reverse play reverse',
          start: 'top 5%',
          end: 'bottom 98%',

          // end: '+=' + `${singleDuration}s`,
          // markers: true,
          // onEnter: () => { gsap.to([heading], { opacity: 1 }) },
          // onLeave: () => { gsap.to([heading], { opacity: 0 }) },
          // onEnterBack: () => { gsap.to([heading], { opacity: 1 }) },
          // onLeaveBack: () => {
          //   if (i === 0) return;
          //   gsap.to([heading], { opacity: 0 })
          // }, 
        }
      });
    });

  })



  return (
    <>
        <div  className='swipe-section head' >
          {

            pageData.map((page, idx) =>
              <div key={idx} className={`heading `}>
                <div className='content' >
                  <h2 >{page.title}</h2>
                  <p>{page.body}</p>
                </div>
              </div>
            )
          }
        </div>
    </>

  )
}

export default Pages;