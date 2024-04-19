// import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { getProject } from '@theatre/core'
import './App.css';
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'

import * as THREE from 'three';


const demoSheet = getProject('Demo Project').sheet('Demo Sheet')


function App() {
  studio.extend(extension)
  studio.initialize();
  

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 30 }}
      shadows
      gl={{
        // outputEncoding: THREE.SRGBColorSpace,
        toneMapping: THREE.LinearToneMapping
      }}
    >
      <SheetProvider sheet={demoSheet}>
        <Experience />
        {/* <color attach="background" args={['black']} /> */}
      </SheetProvider>
    </Canvas>

  );
}

export default App;
