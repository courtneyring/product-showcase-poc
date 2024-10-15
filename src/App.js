// import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { getProject } from '@theatre/core'
import './App.css';
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'

import * as THREE from 'three';
import demoProjectState from './assets/state2.json'
import Pages from './components/Pages/Pages';
import pageData from './assets/data';
import Navbar from './components/Navbar/Navbar';
import Overlay from './components/Overlay/Overlay';
import { createPortal } from 'react-dom';
import { useState } from 'react'; 

const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet');
// const demoSheet = getProject('Demo Project').sheet('Demo Sheet');


function App() {
  // studio.extend(extension)
  // studio.initialize();
  const [menuIsOpen, setMenuIsOpen] = useState(true);


  return (
    <>
      <Navbar />
      <div className='model-container'>

        <Canvas
          camera={{ position: [0, 0, 15], fov: 30 }}
          shadows
          gl={{
            toneMapping: THREE.LinearToneMapping
          }}
        >
          <SheetProvider sheet={demoSheet}>
            <Experience />
          </SheetProvider>
        </Canvas>
      </div>
      <div className='page-container'>
        <Pages pageData={pageData} />
      </div>
      {menuIsOpen && createPortal(
        <Overlay closeFn={() => setMenuIsOpen(false)}>
          <div>test</div>

        </Overlay>,
        document.body
      )
      }



    </>


  );
}

export default App;
