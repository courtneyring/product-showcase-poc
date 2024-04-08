// import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { getProject } from '@theatre/core'
import './App.css';
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'



const demoSheet = getProject('Demo Project').sheet('Demo Sheet')


function App() {
  studio.extend(extension)
  studio.initialize();
  

  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, - 2, 6]
      }}
    >
      <SheetProvider sheet={demoSheet}>
        {/* <Experience /> */}
        <Experience />
        <color attach="background" args={['black']} />
      </SheetProvider>
    </Canvas>

  );
}

export default App;
