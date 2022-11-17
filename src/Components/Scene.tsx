/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: zzyeo (https://sketchfab.com/zzyeo)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/ethereum-coin-a8ece89bbf6a4cdd892c92efc8021dd8
title: Ethereum Coin
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useEffect } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Pyramid_3_C_Silver_Base_0: THREE.Mesh
    Pyramid_1_C_Silver_Base_0: THREE.Mesh
    Pyramid_C_Silver_Base_0: THREE.Mesh
  }
  materials: {
    C_Silver_Base: THREE.MeshStandardMaterial
  }
}

type ActionName = 'CINEMA_4D_Main'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<any>()
  const { nodes, materials, animations } = useGLTF('/scene.gltf') as any
  const { actions } = useAnimations<any>(animations, group)

  useEffect(()=>{
    actions.CINEMA_4D_Main?.play()
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" position={[-0.01, 0, -0.01]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
          <group name="35c758118ce74fb2911114a2add11458fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="eth">
                  <group name="Pyramid_3" position={[0.22, 72.6, 0.93]} rotation={[0, Math.PI / 4, 0]}>
                    <mesh name="Pyramid_3_C_Silver_Base_0" geometry={nodes.Pyramid_3_C_Silver_Base_0.geometry} material={materials.C_Silver_Base} />
                  </group>
                  <group name="Pyramid_1" position={[-0.11, -36.3, 32.92]} rotation={[-Math.PI / 2, 0, -Math.PI]}>
                    <mesh name="Pyramid_1_C_Silver_Base_0" geometry={nodes.Pyramid_1_C_Silver_Base_0.geometry} material={materials.C_Silver_Base} />
                  </group>
                  <group name="Pyramid" position={[-0.11, -36.3, -33.85]} rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh name="Pyramid_C_Silver_Base_0" geometry={nodes.Pyramid_C_Silver_Base_0.geometry} material={materials.C_Silver_Base} />
                  </group>
                </group>
                <group name="CINEMA_4D_Editor" position={[208.8, 86.06, 339.14]} rotation={[Math.PI, 0.99, 3.04]}>
                  <group name="Object_5" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')