import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { MyScene } from './MyScene';

function App() {
    const canvasRef = useRef(null);
    return (
        <div id="canvas-container" Style="height: 100vh;">
            <Suspense fallback={<h1>Loading profile...</h1>}>
                <Canvas>
                    <ScrollControls pages={10}>
                        <MyScene canvasRef={canvasRef} />
                    </ScrollControls>
                </Canvas>
            </Suspense>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
