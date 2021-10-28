import { OrbitControls, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { Suspense, useEffect, useState } from 'react';
import { useKey } from 'react-use';
import { applyAnimationToTimelineLine } from '../src/helpers/lerp';
import Island from './Island';

const timelineFragments = [
    {
        duration: 1 / 10,
        position: [
            {
                x: 3.287051563715002,
                y: 0.7618830587647809,
                z: 2.8792822437156245,
            },
            {
                x: 2,
                y: -1,
                z: -3,
            },
        ],
        lookAt: [
            { x: 2, y: -1, z: -4.5 },
            { x: 2, y: -1, z: -4.5 },
        ],
    },
    {
        duration: 1 / 10,
        position: [
            {
                x: 2,
                y: -1,
                z: -3,
            },
            {
                x: 3,
                y: -1.4,
                z: -6,
            },
        ],
        lookAt: [
            { x: 2, y: -1, z: -4.5 },
            { x: 2, y: -1, z: -4.5 },
        ],
    },
    {
        duration: 3 / 10,
        position: [
            {
                x: 3,
                y: -1.4,
                z: -6,
            },
            { x: -4, y: 0, z: 2 },
        ],
        lookAt: [
            { x: 2, y: -1, z: -4.5 },
            { x: 0, y: -0, z: 0 },
        ],
    },
    {
        duration: 3 / 10,
        position: [
            { x: -4, y: 0, z: 2 },
            { x: 2, y: 0, z: 7 },
        ],
        lookAt: [
            { x: 0, y: -0, z: 0 },
            { x: 2, y: -1, z: -4.5 },
        ],
    },
];

export function MyScene({ canvasRef }) {
    const data = useScroll();
    const { camera, viewport } = useThree();
    const [mouseCoords, setMouseCoords] = useState({});
    const [orbitControlsVis, setOrbitControlsVis] = useState(false);

    useFrame(({ mouse }) => {
        setMouseCoords({
            x: (mouse.x * viewport.width) / 2,
            y: (mouse.y * viewport.height) / 2,
        });

        if (!orbitControlsVis) {
            let completeAnimationProgress = 0;
            // Maakt modulair de timelineProgressPerFragment array aan = [data.range(1/3, 1/3), data.range(1/3, 1/3)]
            const timelineProgressPerFragment = timelineFragments.map(
                ({ duration }, i) => {
                    const range = data.range(
                        i === 0 ? 0 : completeAnimationProgress,
                        duration
                    );
                    completeAnimationProgress += duration;
                    return range;
                }
            );

            completeAnimationProgress > 1 &&
                console.error(
                    `completeAnimationProgress cant be bigger than one! and is currently ${completeAnimationProgress}`
                );

            // Deze indexOfTimeLineFragment wordt bepaald door de .forEach
            let currentFragmentIndex = 0;
            timelineProgressPerFragment.forEach((r, i) => {
                if (r === 0 || r === 1) {
                    return;
                } else {
                    currentFragmentIndex = i;
                }
            });

            if (
                // Als alle animaties zijn afgelopen of nog niet begonnen, dan doen we niks
                !timelineProgressPerFragment.every((r) => r === 0) ||
                !timelineProgressPerFragment.every((r) => r === 1)
            ) {
                applyAnimationToTimelineLine(
                    camera,
                    timelineProgressPerFragment[currentFragmentIndex],
                    timelineFragments[currentFragmentIndex]
                );
                // Voeg muis-movement toe aan camera
                let { x, y, z } = camera.position;
                camera.position.set(
                    (x += mouse.x / 10),
                    (y += mouse.y / 10),
                    z
                );
            }
        }
    });
    const { vec3 } = useControls({
        vec3: {
            x: 0,
            y: 0,
            z: 0,
        },
    });

    useKey('f', () => {
        console.log(camera.position);
        console.log(camera.rotation);
    });

    useKey('o', () => {
        setOrbitControlsVis(true);
    });
    useKey('l', () => {
        setOrbitControlsVis(false);
    });

    useEffect(() => {
        // handig voor orbitcontrols
        console.log('OBC = ' + orbitControlsVis);
    }, [orbitControlsVis]);

    useEffect(() => {
        // handig voor positionering
        console.log(vec3);
    }, [vec3]);

    return (
        <>
            {orbitControlsVis && <OrbitControls />}
            {/* <axesHelper size={40} /> */}
            {/* <gridHelper /> */}
            <mesh position={Object.values(vec3)}>
                <boxBufferGeometry />
                <meshStandardMaterial color={'red'} />
            </mesh>
            <Suspense fallback={null}>
                <Island />
            </Suspense>
            <ambientLight args={[0xff0000]} intensity={0.1} />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />)
        </>
    );
}
