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
import { useEffect, useState, useCallback, Suspense } from 'react';
import Loader from './components/Loading/Loading';




const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet');
// const demoSheet = getProject('Demo Project').sheet('Demo Sheet');


function App() {
  // studio.extend(extension)
  // studio.initialize();

  const [currentSection, setCurrentSection] = useState(0);

  const findSection = useCallback(() => {
    let scrollTop = window.scrollY;
    for (let i = 0; i < pageData.length; i++) {
      if (scrollTop > (i - 1 + 0.5) * window.innerHeight && scrollTop < (i + 0.5) * window.innerHeight && currentSection !== i) {
        setCurrentSection(i)
        break;
      }
    }
  }, [currentSection])


  useEffect(() => {
    document.addEventListener('scroll', findSection)
    return () => {
      document.removeEventListener('scroll', findSection);
    };
  }, [findSection])


  return (
    <>

      <Suspense fallback={<Loader />}>
      <Navbar />
      <div className='page-container'>
        <Pages pageData={pageData} />
      </div>
      <div className='model-container'>
        
        
        <Canvas
          camera={{ position: [0, 0, 15], fov: 30 }}
          shadows
          gl={{
            toneMapping: THREE.LinearToneMapping
          }}
        >
          
          
            <SheetProvider sheet={demoSheet}>
              <Experience pageData={pageData} currentSection={currentSection} />
            </SheetProvider>
          
        </Canvas>
        
      </div>
      </Suspense>
    </>
  );
}

export default App;
