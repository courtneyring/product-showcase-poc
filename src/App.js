import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import './App.css';

function App() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, - 2, 6]
      }}
    >
      <Experience />
      <color attach="background" args={['black']} />
    </Canvas>

  );
}

export default App;