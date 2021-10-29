import { OrbitControls, Text, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useKey } from 'react-use';
import { applyAnimationToTimelineLine, handleIntro } from '../src/helpers/lerp';
import { timelineFragments } from './helpers/timeline';
import Island from './Island';

export function MyScene({ setShowOutro }) {
    // Drei hooks
    const data = useScroll();
    const { camera } = useThree();

    // Text Reft
    const textGroupRef = useRef();
    const introGroupRef = useRef();

    // States
    const [currentText, setCurrentText] = useState();
    const [orbitControlsVis, setOrbitControlsVis] = useState(false);

    // Request animation Frame
    useFrame(({ mouse }) => {
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

            // Je krijgt een error als je meer durations hebt, dan tijd
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

            // Handle intro screen
            if (
                currentFragmentIndex === 0 &&
                introGroupRef?.current?.children
            ) {
                handleIntro(
                    timelineProgressPerFragment[currentFragmentIndex],
                    introGroupRef.current
                );
            }

            // Ervoor zorgen dat de text altijd naar jou kijkt
            if (textGroupRef.current) {
                textGroupRef.current.lookAt(camera.position);
            }

            if (
                // Als alle animaties zijn afgelopen of nog niet begonnen, dan doen we niks
                !timelineProgressPerFragment.every((r) => r === 0) ||
                !timelineProgressPerFragment.every((r) => r === 1)
            ) {
                applyAnimationToTimelineLine(
                    camera,
                    timelineProgressPerFragment[currentFragmentIndex],
                    timelineFragments[currentFragmentIndex],
                    textGroupRef.current
                );
                // Kijk of er ook nog text is dat aangepast moet worden
                if (
                    timelineFragments[currentFragmentIndex]?.text?.content &&
                    currentText !==
                        timelineFragments[currentFragmentIndex].text.content
                ) {
                    setCurrentText(
                        timelineFragments[currentFragmentIndex].text.content
                    );
                }
                // Voeg muis-movement toe aan camera
                camera.translateX(mouse.x / 10);
                camera.translateY(mouse.y / 10);
            }

            if (
                timelineProgressPerFragment[
                    timelineProgressPerFragment.length - 1
                ] > 0.9
            ) {
                setShowOutro(true);
            } else {
                setShowOutro(false);
            }
        }
    });

    useKey('o', () => {
        setOrbitControlsVis(true);
    });
    useKey('l', () => {
        setOrbitControlsVis(false);
    });

    useEffect(() => {
        // handig voor orbitcontrols
        console.log('Orbit Controls = ' + orbitControlsVis);
    }, [orbitControlsVis]);

    return (
        <>
            {orbitControlsVis && <OrbitControls />}
            <Suspense fallback={null}>
                <group ref={introGroupRef}>
                    <Text
                        fillOpacity={0}
                        position={[
                            3.287051563715002, 0.7618830587647809,
                            1.8792822437156245,
                        ]}
                        font="font/Fruktur-Regular.ttf"
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={0.15}
                        outlineBlur={0.05}
                    >
                        The Warrior
                    </Text>
                    <Text
                        fillOpacity={0}
                        position={[
                            3.287051563715002, 0.5618830587647809,
                            1.8792822437156245,
                        ]}
                        font="font/Fruktur-Regular.ttf"
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={0.1}
                        outlineBlur={0.05}
                    >
                        A Short Story
                    </Text>
                    <Text
                        fillOpacity={0}
                        position={[
                            3.287051563715002, 0.3618830587647809,
                            1.8792822437156245,
                        ]}
                        font="font/Fruktur-Regular.ttf"
                        color="#d8cf25"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={0.1}
                        outlineBlur={0.05}
                    >
                        By Level30Wizards
                    </Text>
                </group>
                <group ref={textGroupRef}>
                    <Text
                        font="font/Fruktur-Regular.ttf"
                        color="brown"
                        anchorX="center"
                        anchorY="middle"
                        fontSize={0.3}
                        outlineBlur={0.05}
                    >
                        {currentText}
                    </Text>
                </group>
                <Island />
            </Suspense>
            )
        </>
    );
}
