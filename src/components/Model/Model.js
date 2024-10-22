import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useScroll, useGLTF } from '@react-three/drei';
import { val } from "@theatre/core";
import { useFrame } from '@react-three/fiber';
import { useEffect, useState, useCallback } from 'react';

const Model = () => {

  const sheet = useCurrentSheet();
  const { scene } = useGLTF('/models/range-rover.glb');
  const [currentSection, setCurrentSection] = useState(0);


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



  useEffect(() => {
    document.addEventListener('scroll', setAnimation)

    return () => {
      document.removeEventListener('scroll', setAnimation);
    };
  }, [setAnimation])

  return (
    <e.primitive object={scene} theatreKey='vehicle' editableType='mesh' />
  )
}

export default Model;