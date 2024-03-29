/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: luyssport (https://sketchfab.com/luyssport)
license: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
source: https://sketchfab.com/models/0970f30574d047b1976ba0aa6f2ef855
title: Ftm
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF('models/highrise/scene.gltf');
    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <group position={[2.11, 4.37, -1.14]}>
                    <mesh
                        geometry={nodes.character_0.geometry}
                        material={nodes.character_0.material}
                    />
                </group>
                <group rotation={[0, 0, -0.1]} scale={[0.55, 0.55, 0.55]}>
                    <mesh
                        geometry={nodes.sky_0.geometry}
                        material={materials.material_15}
                    />
                </group>
                <group
                    position={[7.25, 0.61, 6.92]}
                    rotation={[-0.77, 0.65, 0.41]}
                />
                <group
                    position={[-9.68, -8.07, 2.28]}
                    rotation={[-0.77, 0.65, 0.41]}
                />
                <group
                    position={[5.3, -9.82, 0.38]}
                    rotation={[-0.77, 0.65, 0.41]}
                />
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.ground_0.geometry}
                        material={materials.ground}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.tree_leaves_0.geometry}
                        material={nodes.tree_leaves_0.material}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.tree_leaves_inv_0.geometry}
                        material={nodes.tree_leaves_inv_0.material}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.roof_0.geometry}
                        material={nodes.roof_0.material}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.madera_0.geometry}
                        material={materials.madera}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.piedras_0.geometry}
                        material={materials.piedras}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.dec_0.geometry}
                        material={materials.material}
                    />
                </group>
                <group position={[1.98, -3.33, 0]}>
                    <mesh
                        geometry={nodes.outline_0.geometry}
                        material={materials.outline}
                    />
                </group>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        geometry={nodes.monster_001_0.geometry}
                        material={materials.monster_001}
                    />
                </group>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        geometry={nodes.monster_0.geometry}
                        material={materials.monster}
                    />
                </group>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        geometry={nodes.eyes002_0.geometry}
                        material={materials.eyes002}
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('models/highrise/scene.gltf');
