import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useScroll, useGLTF } from '@react-three/drei';
import { val } from "@theatre/core";
import { useFrame } from '@react-three/fiber';

const Model = () => {

  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const { scene } = useGLTF('/models/range-rover.glb');

  useFrame(() => {
    // console.log(scroll.offset)
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
    // console.log(scroll.visible(0, 1 / 7))
  })

  return (
    <e.primitive object={scene} theatreKey='vehicle' editableType='mesh' />
  )
}

export default Model;