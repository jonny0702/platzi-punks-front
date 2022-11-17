import { ReactNode, Suspense } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { Model } from "./Scene";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Controls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <OrbitControls args={[camera, domElement]} enableDamping autoRotate />;
};

export const ModalTransfer: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onOpen,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
      <ModalContent>
        <ModalHeader>
          <Text>Please Introduce your account address</Text>
        </ModalHeader>
        <ModalBody>
          <Suspense fallback={null}>
            <Canvas>
              <pointLight intensity={0.7} />
              <ambientLight position={[0, 2, 3]} intensity={0.7} color="#f5f5f5"/>
              <Model scale={[2,2,3]}/>
              <Controls/>
            </Canvas>
          </Suspense>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
