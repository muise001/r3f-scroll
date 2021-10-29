import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { MyScene } from './MyScene';
import './index.css';
import { Outro } from './Outro';

function App() {
    const [showOutro, setShowOutro] = useState(false);
    return (
        <div id="canvas-container" Style="height: 100vh;">
            <Outro showOutro={showOutro} />

            <Suspense fallback={<h1>Loading profile...</h1>}>
                <Canvas>
                    <ScrollControls pages={10}>
                        <MyScene setShowOutro={setShowOutro} />
                    </ScrollControls>
                </Canvas>
            </Suspense>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
