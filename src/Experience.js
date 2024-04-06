import { CameraControls } from '@react-three/drei';
import { Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import { editable as e, SheetProvider } from '@theatre/r3f'



const Model = () => {
  const scroll = useScroll();
  const [rotation, setRotation] = useState(0);

  useFrame(() => {
    setRotation((Math.PI * 2) * scroll.range(0, 1))
  })

  return (
    <e.mesh rotation={[0, rotation, 0]} theatreKey="mesh">
      <torusGeometry />
      <meshStandardMaterial color={'green'} />
    </e.mesh>
  )

}


const Experience = () => {

  const pages = 3;

  return (
    <>
      <ambientLight intensity={3} />
      {/* <CameraControls /> */}

      <ScrollControls pages={pages}>
        <Model />
        <Scroll>

        </Scroll>
        <Scroll html>
          <div className='container'>
            {
              [...Array(pages)].map((page, idx) => {
                return <div key={idx} className='section'>
                  <div className='words'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  </div>
                </div>
              })
            }

          </div>


        </Scroll>

      </ScrollControls>


    </>
  )
}

export default Experience;