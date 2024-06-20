import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useScroll, useGLTF } from '@react-three/drei';
import { val } from "@theatre/core";
import { useFrame } from '@react-three/fiber';
import { useEffect, useState, useCallback } from 'react';

const Model = () => {

  const sheet = useCurrentSheet();
  // const scroll = useScroll();
  const { scene } = useGLTF('/models/range-rover.glb');
  // const [scrollDirection, setScrollDirection] = useState('up');
  const [currentSection, setCurrentSection] = useState(0);
  useFrame(() => {
    // console.log(scroll.offset)
    // the length of our sequence

    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    // var body = document.body,
    //   html = document.documentElement;

    // var height = Math.max(body.scrollHeight, body.offsetHeight,
    //   html.clientHeight, html.scrollHeight, html.offsetHeight);
    // let scrollPercent = scrollTop / height;


    // console.log(sheet.sequence.position)
    // console.log(scrollPercent)
    // sheet.sequence.position = scrollPercent * sequenceLength;





    // sheet.sequence.position = 0;
    // console.log(scroll.visible(0, 1 / 7))
  })

  const setAnimation = useCallback(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    let scrollTop = window.scrollY;

    for (let i = 0; i < sequenceLength; i++) {

      if (scrollTop > (i - 1 + 0.5) * window.innerHeight && scrollTop < (i + 0.5) * window.innerHeight && currentSection !== i) {
        let sequenceConfig = { range: [currentSection, i]}
        if( i < currentSection) {
          sequenceConfig.range = [i, currentSection];
          sequenceConfig['direction'] = 'reverse'
        }

        sheet.sequence.play(sequenceConfig)
        setCurrentSection(i)
        break;
      }
    }
  }, [currentSection])

  useState(() => {
    console.log(currentSection);
  }, [currentSection])
  // const debounce = (mainFunction, delay) => {
  //   // Declare a variable called 'timer' to store the timer ID
  //   let timer;

  //   // Return an anonymous function that takes in any number of arguments
  //   return function (...args) {
  //     // Clear the previous timer to prevent the execution of 'mainFunction'
  //     clearTimeout(timer);

  //     // Set a new timer that will execute 'mainFunction' after the specified delay
  //     timer = setTimeout(() => {
  //       mainFunction(...args);
  //     }, delay);
  //   };
  // };


  // const updateScrollDirection = (lastScrollY) => {
  //   const scrollY = window.scrollY;
  //   const direction = scrollY > lastScrollY ? 'down' : 'up';
  //   if (scrollY - lastScrollY !== 0) {
  //     setScrollDirection(direction);
  //   }
  //   lastScrollY = scrollY > 0 ? scrollY : 0;
  // };

  useEffect(() => {

    // let lastScrollY = window.scrollY;
    document.addEventListener('scroll', setAnimation)
    // document.addEventListener('scroll', (e) => updateScrollDirection(lastScrollY))
    // document.addEventListener('scroll', debounce(testFn, 20))
    return () => {
      document.removeEventListener('scroll', setAnimation);
    };
  }, [setAnimation])

  return (
    <e.primitive object={scene} theatreKey='vehicle' editableType='mesh' />
  )
}

export default Model;