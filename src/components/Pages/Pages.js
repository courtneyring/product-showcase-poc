import { useFrame } from '@react-three/fiber';
// import Page from '../Page/Page';
import { useScroll } from '@react-three/drei';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Scroll } from '@react-three/drei';
import { gsap } from "gsap";

const Pages = ({ pageData }) => {
 
  const scrollRef = useRef();
  const itemsRef = useRef([])
  const [pages, setPages] = useState(pageData)
  const scroll = useScroll();
  let x = 0;

  useFrame(() => {
    for (let i =0; i < pageData.length; i++) {
      if (scroll.visible(i/(pageData.length-1), 1/(pageData.length-1), 0.03)) {
        if (!pageData[i].activated && itemsRef.current[i]) {
          console.log(itemsRef)
          gsap.to(itemsRef.current[i], {
            opacity: 1,
            y: '0vh',
            duration: 0.5,
            // scrollTrigger: {
            //   trigger: node.current,
            //   start: 'top bottom-=40%',
            //   markers: true
            // },
          });
          pageData[i].activated = true;
        }

      }
    }

  })

  return (
    <>
      <Scroll html >
        <div id='test' style={{width: '100%', height: '100%'}} ref={scrollRef}>
          {

            pageData.map((page, idx) =>
              <div key={idx} className='section'>
                <div className='content' ref={el => itemsRef.current[idx] = el} style={{opacity: 0, transform: 'translateY(2vh)'}}>
                  <h2 >{page.title}</h2>
                  <p>{page.body}</p>
                </div>
              </div>
            )
          }
        </div>

        </Scroll>
    </>

  )
}

export default Pages;