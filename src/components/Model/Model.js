import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';

const Model = ({ currentSection }) => {

  const sheet = useCurrentSheet();
  const { scene } = useGLTF('/models/range-rover.glb');
  const [previousSection, setPreviousSection] = useState(0);


  useEffect(() => {
    if (previousSection == currentSection) return;
    let sequenceConfig = { range: [previousSection, currentSection] }
    if (currentSection < previousSection) {
      sequenceConfig.range = [currentSection, previousSection];
      sequenceConfig['direction'] = 'reverse'
    }
    sheet.sequence.play(sequenceConfig)
    setPreviousSection(currentSection)
  }, [currentSection])



  return (
    <e.primitive object={scene} theatreKey='vehicle' editableType='mesh' />
  )
}

export default Model;