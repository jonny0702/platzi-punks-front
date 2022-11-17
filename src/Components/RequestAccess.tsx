import { ReactNode, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Scene";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <OrbitControls args={[camera, domElement]} enableDamping autoRotate />;
};

export const RequestAccess = () => {
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Connect your wallet</AlertTitle>
        <AlertDescription>To access the app</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      <div style={{ marginTop: "1rem", height: "20rem" }}>
        <Suspense fallback={null}>
          <Canvas>
            <Model position={[0, -2, 0]} scale={[1.6, 1.6, 1.5]} />
            <pointLight intensity={0.7} position={[0, -0.5, 3]} color="#f5f5f5" />
            <ambientLight
              intensity={0.5}
            />
            <Controls />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};
